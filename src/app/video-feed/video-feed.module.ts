import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoFeedComponent } from './containers/video-feed/video-feed.component';
import { NgxsModule } from '@ngxs/store';
import { RouterModule } from '@angular/router';
import { VideoFeedState } from './state/video-feed.state';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@NgModule({
    declarations: [VideoFeedComponent],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxsModule.forFeature([VideoFeedState]),
        RouterModule.forChild([
            {
                path: '',
                component: VideoFeedComponent,
                children: [],
            },
        ]),
        NzPaginationModule,
    ],
})
export class VideoFeedModule {}
