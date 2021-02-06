import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { VideoDetailsComponent } from './containers/video-details/video-details.component'
import { RouterModule } from '@angular/router'
import { SharedModule } from '../shared/shared.module'

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
        SharedModule,
    ],
    exports: [VideoDetailsComponent],
})
export class VideoDetailsModule {}
