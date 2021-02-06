import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { VideoDetailsComponent } from './containers/video-details/video-details.component'
import { RouterModule } from '@angular/router'

@NgModule({
    declarations: [VideoDetailsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: VideoDetailsComponent,
                children: [],
            },
        ]),
    ],
})
export class VideoDetailsModule {}
