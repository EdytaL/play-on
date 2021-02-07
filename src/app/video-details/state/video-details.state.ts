import { State, Action, Selector, StateContext } from '@ngxs/store';
import { VideoDetailsAction } from '../actions/video-details.actions';

export interface VideoDetailsStateModel {
    items: string[];
}

@State<VideoDetailsStateModel>({
    name: 'videoDetails',
    defaults: {
        items: [],
    },
})
export class VideoDetailsState {
    @Selector()
    public static getState(state: VideoDetailsStateModel) {
        return state;
    }

    @Action(VideoDetailsAction)
    public add(
        ctx: StateContext<VideoDetailsStateModel>,
        { payload }: VideoDetailsAction
    ) {
        const stateModel = ctx.getState();
        stateModel.items = [...stateModel.items, payload];
        ctx.setState(stateModel);
    }
}
