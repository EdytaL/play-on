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
            map((response: any) => response.data),
            tap((items: any[]) => {
                return dispatch([new FetchVideoFeedListSuccess(items)])
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
        let items = action.payload

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
}
