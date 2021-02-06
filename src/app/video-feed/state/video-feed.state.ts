import {
    State,
    Action,
    Selector,
    StateContext,
    NgxsOnInit,
    Store,
} from '@ngxs/store'
import { VideoFeedService } from '../services/video-feed.service'
import {
    FetchVideoFeedList,
    FetchVideoFeedListFailure,
    FetchVideoFeedListSuccess,
} from '../actions/video-feed.actions'
import { catchError, map, tap } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { VideoDetails } from '../../shared/models/video-details-model'
import { Resource, ResourceType } from '../../shared/models/resource-model'
import { VideoListingResponse } from '../../shared/models/listing-response.model'

export interface VideoFeedStateModel {
    items: any[]
    fetchItemsPending: boolean
    fetchItemsSuccess: boolean
    fetchItemsError: undefined
}

@State<VideoFeedStateModel>({
    name: 'videoFeed',
    defaults: {
        items: [],
        fetchItemsPending: false,
        fetchItemsSuccess: false,
        fetchItemsError: undefined,
    },
})
@Injectable()
export class VideoFeedState implements NgxsOnInit {
    constructor(private service: VideoFeedService, private store: Store) {}

    ngxsOnInit({ patchState }: StateContext<VideoFeedStateModel>) {}
    @Selector()
    public static getState(state: VideoFeedStateModel) {
        return state
    }

    @Action(FetchVideoFeedList)
    public getVideoList(
        { patchState, dispatch, getState }: StateContext<VideoFeedStateModel>,
        {}: FetchVideoFeedList
    ) {
        patchState({
            ...getState(),
            fetchItemsPending: true,
            fetchItemsSuccess: false,
            fetchItemsError: undefined,
            items: undefined,
        })
        return this.service.getVideoList().pipe(
            tap((response: VideoListingResponse) => {
                return dispatch([new FetchVideoFeedListSuccess(response)])
            }),
            catchError((httpError: HttpErrorResponse) => {
                return dispatch(new FetchVideoFeedListFailure(httpError.error))
            })
        )
    }

    @Action(FetchVideoFeedListSuccess)
    getSellerDetailsSuccess(
        { patchState, getState }: StateContext<VideoFeedStateModel>,
        action: FetchVideoFeedListSuccess
    ) {
        let items = action.payload['items'].map((item) => {
            return this.mapToVideoModel(item)
        })

        patchState({
            fetchItemsPending: false,
            fetchItemsSuccess: true,
            fetchItemsError: undefined,
            items: items,
        })
    }
    @Action(FetchVideoFeedListFailure)
    getSellerDetailsFailure(
        { patchState, getState }: StateContext<VideoFeedStateModel>,
        action: FetchVideoFeedListFailure
    ) {
        patchState({
            ...getState(),
            fetchItemsPending: false,
            fetchItemsSuccess: false,
            fetchItemsError: action.payload,
        })
    }

    mapToVideoModel(item: any): VideoDetails {
        let formattedResources: any
        let thumbnailImage: any
        if (item?.resources?.length) {
            formattedResources = this.formatResources(item.resources)
            if (formattedResources?.length)
                thumbnailImage = this.getThumbnailImageUrl(formattedResources)
        }

        return {
            id: item.id,
            title: item?.attributes?.productTitle,
            audience: item?.attributes?.audience,
            description: item?.attributes?.description,
            imageUrl: thumbnailImage,
            resources: formattedResources,
        }
    }

    formatResources(resources: Array<any>): Array<Resource> {
        let filteredResources = resources.filter(
            (item) =>
                item.type != null &&
                (item.type.toLowerCase() == ResourceType.IMAGE ||
                    item.type.toLowerCase() == ResourceType.VIDEO ||
                    item.type.toLowerCase() == ResourceType.VIDEO_HD)
        )

        return filteredResources.length != 0
            ? filteredResources.map((item) => {
                  return {
                      id: item.id,
                      type: this.mapResourceType(item.type),
                      url: item.url,
                  }
              })
            : []
    }

    mapResourceType(type: string): ResourceType {
        switch (type.toLowerCase()) {
            case ResourceType.IMAGE: {
                return ResourceType.IMAGE
                break
            }
            case ResourceType.VIDEO: {
                return ResourceType.VIDEO
                break
            }
            case ResourceType.VIDEO_HD: {
                return ResourceType.VIDEO_HD
                break
            }
            default:
                return ResourceType.IMAGE
        }
    }

    getThumbnailImageUrl(resources: Array<Resource>): string {
        let resourcesImageType = resources.filter(
            (item) => item.type.toLowerCase() == ResourceType.IMAGE
        )
        return resourcesImageType?.length ? resourcesImageType[0].url : ''
    }
}
