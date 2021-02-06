import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { VideoFeedComponent } from './containers/video-feed/video-feed.component'
import { NgxsModule } from '@ngxs/store'
import { RouterModule } from '@angular/router'
import { VideoFeedState } from './state/video-feed.state'

@NgModule({
    declarations: [VideoFeedComponent],
    imports: [
        CommonModule,
        NgxsModule.forFeature([VideoFeedState]),
        RouterModule.forChild([
            {
                path: '',
                component: VideoFeedComponent,
                children: [],
            },
        ]),
    ],
})
export class VideoFeedModule {}
