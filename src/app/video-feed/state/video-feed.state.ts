import { State, Action, Selector, StateContext, NgxsOnInit } from '@ngxs/store';
import { VideoFeedService } from '../services/video-feed.service';
import {
    ChangePage,
    ClearSelectedVideo,
    FetchVideoFeedList,
    FetchVideoFeedListFailure,
    FetchVideoFeedListSuccess,
    SelectVideo,
} from '../actions/video-feed.actions';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VideoDetails } from '../../shared/models/video-details-model';
import { Resource, ResourceType } from '../../shared/models/resource-model';
import { VideoListingResponse } from '../../shared/models/listing-response.model';
import { IPageable } from '../../shared/models/page.model';

export interface VideoFeedStateModel {
    items: any[];
    fetchItemsPending: boolean;
    fetchItemsSuccess: boolean;
    fetchItemsError: undefined;
    pagination: IPageable;
    metadata: IMetadata;
    selectedVideo: VideoDetails;
    searchPhrase: string;
}

export interface IMetadata {
    count: number;
}

export enum DefaultSearchMetadata {
    page = 1,
    limit = 12,
}

@State<VideoFeedStateModel>({
    name: 'videoFeed',
    defaults: {
        items: [],
        fetchItemsPending: false,
        fetchItemsSuccess: false,
        fetchItemsError: undefined,
        pagination: {
            limit: DefaultSearchMetadata.limit,
            page: DefaultSearchMetadata.page,
        },
        metadata: { count: 0 },
        selectedVideo: undefined,
        searchPhrase: null,
    },
})
@Injectable()
export class VideoFeedState implements NgxsOnInit {
    constructor(private service: VideoFeedService) {}

    ngxsOnInit({ patchState }: StateContext<VideoFeedStateModel>) {}
    @Selector()
    public static getState(state: VideoFeedStateModel) {
        return state;
    }

    @Action(FetchVideoFeedList)
    public getVideoList(
        { patchState, dispatch, getState }: StateContext<VideoFeedStateModel>,
        action: FetchVideoFeedList
    ) {
        patchState({
            ...getState(),
            fetchItemsPending: true,
            fetchItemsSuccess: false,
            fetchItemsError: undefined,
            items: undefined,
            searchPhrase: action.payload,
        });
        const { pagination, searchPhrase } = getState();
        const offset = pagination?.page
            ? (pagination.page - 1) * DefaultSearchMetadata.limit
            : 0;
        return this.service
            .getVideoList(offset, DefaultSearchMetadata.limit, searchPhrase)
            .pipe(
                tap((response: VideoListingResponse) => {
                    return dispatch([new FetchVideoFeedListSuccess(response)]);
                }),
                catchError((httpError: HttpErrorResponse) => {
                    return dispatch(
                        new FetchVideoFeedListFailure(httpError.error)
                    );
                })
            );
    }

    @Action(FetchVideoFeedListSuccess)
    getVideoListSuccess(
        { patchState, getState }: StateContext<VideoFeedStateModel>,
        action: FetchVideoFeedListSuccess
    ) {
        let items = action.payload.items
            .filter((item) => item?.resources?.length)
            .map((item) => {
                return this.mapToVideoModel(item);
            })
            .filter((item) => item != null);
        let metadata = action.payload._meta;

        patchState({
            fetchItemsPending: false,
            fetchItemsSuccess: true,
            fetchItemsError: undefined,
            items: items,
            metadata: { count: metadata.total },
        });
    }

    @Action(FetchVideoFeedListFailure)
    getVideoListFailure(
        { patchState, getState }: StateContext<VideoFeedStateModel>,
        action: FetchVideoFeedListFailure
    ) {
        patchState({
            ...getState(),
            fetchItemsPending: false,
            fetchItemsSuccess: false,
            fetchItemsError: action.payload,
        });
    }

    @Action(ChangePage)
    changePage(
        { patchState, dispatch, getState }: StateContext<VideoFeedStateModel>,
        action: ChangePage
    ) {
        patchState({
            pagination: { ...getState().pagination, page: action.payload },
        });
        return dispatch([new FetchVideoFeedList(getState().searchPhrase)]);
    }

    @Action(SelectVideo)
    selectVideo(
        { patchState, getState }: StateContext<VideoFeedStateModel>,
        action: SelectVideo
    ) {
        patchState({
            ...getState(),
            selectedVideo: action.payload,
        });
    }

    @Action(ClearSelectedVideo)
    clearSelectVideo({
        patchState,
        getState,
    }: StateContext<VideoFeedStateModel>) {
        patchState({
            ...getState(),
            selectedVideo: undefined,
        });
    }

    mapToVideoModel(item: any): VideoDetails {
        let formattedResources = this.formatResources(item.resources);
        let thumbnailImage: any;
        if (!formattedResources.length) {
            return null;
        }
        thumbnailImage = this.getThumbnailImageUrl(formattedResources);

        return {
            id: item.id,
            title: item?.attributes?.productTitle,
            audience: item?.attributes?.audience,
            description: item?.attributes?.description,
            imageUrl: thumbnailImage,
            resources: formattedResources,
        };
    }

    formatResources(resources: Array<any>): Array<Resource> {
        let filteredResources = resources.filter(
            (item) =>
                item.type != null &&
                (item.type.toLowerCase() == ResourceType.IMAGE ||
                    item.type.toLowerCase() == ResourceType.VIDEO ||
                    item.type.toLowerCase() == ResourceType.VIDEO_HD)
        );

        return filteredResources.length != 0
            ? filteredResources.map((item) => {
                  return {
                      id: item.id,
                      type: this.mapResourceType(item.type),
                      url: item.url,
                  };
              })
            : [];
    }

    mapResourceType(type: string): ResourceType {
        switch (type.toLowerCase()) {
            case ResourceType.IMAGE: {
                return ResourceType.IMAGE;
                break;
            }
            case ResourceType.VIDEO: {
                return ResourceType.VIDEO;
                break;
            }
            case ResourceType.VIDEO_HD: {
                return ResourceType.VIDEO_HD;
                break;
            }
            default:
                return ResourceType.IMAGE;
        }
    }

    getThumbnailImageUrl(resources: Array<Resource>): string {
        let resourcesImageType = resources.filter(
            (item) => item.type.toLowerCase() == ResourceType.IMAGE
        );
        return resourcesImageType?.length
            ? this.formatImgUrlResize(resourcesImageType[0].url, 320)
            : '';
    }

    formatImgUrlResize(url: string, width: number): string {
        return url.replace('/im/', '/im:i:w_' + width + '/');
    }
}
