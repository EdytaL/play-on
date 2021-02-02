import { TestBed, async } from '@angular/core/testing'
import { NgxsModule, Store } from '@ngxs/store'
import { VideoFeedState, VideoFeedStateModel } from './video-feed.state'
import { VideoFeedAction } from './video-feed.actions'

describe('VideoFeed store', () => {
    let store: Store
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([VideoFeedState])],
        }).compileComponents()
        store = TestBed.get(Store)
    }))

    it('should create an action and add an item', () => {
        const expected: VideoFeedStateModel = {
            items: ['item-1'],
        }
        store.dispatch(new VideoFeedAction('item-1'))
        const actual = store.selectSnapshot(VideoFeedState.getState)
        expect(actual).toEqual(expected)
    })
})
