import { Component, Input, OnInit } from '@angular/core'
import { VideoDetails } from '../../../shared/models/video-details-model'

@Component({
    selector: 'app-video-details',
    templateUrl: './video-details.component.html',
    styleUrls: ['./video-details.component.less'],
})
export class VideoDetailsComponent implements OnInit {
    @Input() video: VideoDetails | undefined

    constructor() {}

    ngOnInit(): void {}
}
