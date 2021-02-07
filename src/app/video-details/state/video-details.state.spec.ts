import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import {
    VideoDetailsState,
    VideoDetailsStateModel,
} from './video-details.state';
import { VideoDetailsAction } from '../actions/video-details.actions';

describe('VideoDetails store', () => {
    let store: Store;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([VideoDetailsState])],
        }).compileComponents();
        store = TestBed.get(Store);
    }));

    it('should create an action and add an item', () => {
        const expected: VideoDetailsStateModel = {
            items: ['item-1'],
        };
        store.dispatch(new VideoDetailsAction('item-1'));
        const actual = store.selectSnapshot(VideoDetailsState.getState);
        expect(actual).toEqual(expected);
    });
});
