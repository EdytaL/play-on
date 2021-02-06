import { Component, OnInit } from '@angular/core'
import { Select, Store } from '@ngxs/store'
import {
    ChangePage,
    FetchVideoFeedList,
} from '../../actions/video-feed.actions'
import { Observable } from 'rxjs'
import { VideoDetails } from '../../../shared/models/video-details-model'
import { IPageable } from '../../../shared/models/page.model'
import { DefaultSearchMetadata, IMetadata } from '../../state/video-feed.state'

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

    @Select((state: any) => state.videoFeed.pagination)
    pagination$: Observable<IPageable> | undefined
    @Select((state: any) => state.videoFeed.metadata)
    metadata$: Observable<IMetadata> | undefined
    pageSize: DefaultSearchMetadata.limit | undefined
    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(new FetchVideoFeedList())
    }

    changePage(page: any) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        this.store.dispatch(new ChangePage(page))
    }
}
