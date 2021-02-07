import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
    ChangePage,
    FetchVideoFeedList,
    SelectVideo,
} from '../../actions/video-feed.actions';
import { Observable, Subject } from 'rxjs';
import { VideoDetails } from '../../../shared/models/video-details-model';
import { IPageable } from '../../../shared/models/page.model';
import { IMetadata } from '../../state/video-feed.state';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounce, debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-video-feed',
    templateUrl: './video-feed.component.html',
    styleUrls: ['./video-feed.component.less'],
})
export class VideoFeedComponent implements OnInit {
    @Select((state: any) => state.videoFeed.items)
    items$: Observable<VideoDetails[]> | undefined;
    @Select((state: any) => state.videoFeed.selectedVideo)
    selectedVideo$: Observable<VideoDetails> | undefined;
    @Select((state: any) => state.videoFeed.fetchItemsPending)
    fetchItemsPending$: Observable<boolean> | undefined;
    @Select((state: any) => state.videoFeed.fetchItemsSuccess)
    fetchItemsSuccess$: Observable<boolean> | undefined;
    @Select((state: any) => state.videoFeed.fetchItemsError) fetchItemsError$:
        | Observable<any>
        | undefined;

    @Select((state: any) => state.videoFeed.pagination)
    pagination$: Observable<IPageable> | undefined;
    @Select((state: any) => state.videoFeed.metadata)
    metadata$: Observable<IMetadata> | undefined;
    activeLayout: string;
    searchForm: FormGroup = this.fb.group({
        filter: [null],
    });
    private ngUnsubscribe = new Subject();
    constructor(private store: Store, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.activeLayout = 'videoFeed';
        this.store.dispatch(new FetchVideoFeedList(null));
        this.searchForm
            .get('filter')
            .valueChanges.pipe(
                takeUntil(this.ngUnsubscribe),
                debounceTime(1000)
            )
            .subscribe((change) =>
                this.store.dispatch(new FetchVideoFeedList(change))
            );
    }

    changePage(page: any): void {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        this.store.dispatch(new ChangePage(page));
    }

    onVideoSelected(video: VideoDetails): void {
        this.store.dispatch(new SelectVideo(video));
        this.activeLayout = 'videoPlayer';
    }
}
