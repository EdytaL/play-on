import { State, Action, Selector, StateContext } from '@ngxs/store'
import { VideoFeedAction } from '../actions/video-feed.actions'

export interface VideoFeedStateModel {
    items: string[]
}

@State<VideoFeedStateModel>({
    name: 'videoFeed',
    defaults: {
        items: [],
    },
})
export class VideoFeedState {
    @Selector()
    public static getState(state: VideoFeedStateModel) {
        return state
    }

    @Action(VideoFeedAction)
    public add(
        ctx: StateContext<VideoFeedStateModel>,
        { payload }: VideoFeedAction
    ) {
        const stateModel = ctx.getState()
        stateModel.items = [...stateModel.items, payload]
        ctx.setState(stateModel)
    }
}
