import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoFeedComponent } from './containers/video-feed/video-feed.component';
import { NgxsModule } from '@ngxs/store';
import { RouterModule } from '@angular/router';
import { VideoFeedState } from './state/video-feed.state';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzGridModule } from 'ng-zorro-antd/grid';

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
        NzBreadCrumbModule,
        NzIconModule,
        NzOutletModule,
        NzGridModule,
    ],
})
export class VideoFeedModule {}
