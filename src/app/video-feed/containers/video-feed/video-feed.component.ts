import { Component, OnInit } from '@angular/core'
import { Select, Store } from '@ngxs/store'
import { FetchVideoFeedList } from '../../actions/video-feed.actions'
import { Observable } from 'rxjs'
import { VideoDetails } from '../../../shared/models/video-details-model'

@Component({
    selector: 'app-video-feed',
    templateUrl: './video-feed.component.html',
    styleUrls: ['./video-feed.component.less'],
})
export class VideoFeedComponent implements OnInit {
    @Select((state: any) => state.videoFeed.items)
    items$: Observable<VideoDetails[]> | undefined
    @Select((state: any) => state.videoFeed.fetchItemsPending)
    fetchItemsPending$: Observable<boolean> | undefined
    @Select((state: any) => state.videoFeed.fetchItemsSuccess)
    fetchItemsSuccess$: Observable<boolean> | undefined
    @Select((state: any) => state.videoFeed.fetchItemsError) fetchItemsError$:
        | Observable<any>
        | undefined
    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(new FetchVideoFeedList())
    }
}
