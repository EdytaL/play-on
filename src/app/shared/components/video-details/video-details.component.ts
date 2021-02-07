import { Component, Input, OnInit } from '@angular/core';
import { VideoDetails } from '../../models/video-details-model';

@Component({
    selector: 'app-video-details',
    templateUrl: './video-details.component.html',
    styleUrls: ['./video-details.component.less'],
})
export class VideoDetailsComponent implements OnInit {
    @Input() video: VideoDetails | undefined;
    @Input() maxTitleLength: number | undefined;
    @Input() maxDescriptionLength: number | undefined;

    constructor() {}

    ngOnInit(): void {}

    public get audience(): string {
        return this.video?.audience ? this.video.audience.toUpperCase() : null;
    }

    public get title(): string {
        return this.maxTitleLength &&
            this.video?.title?.length > this.maxTitleLength
            ? this.video.title.slice(0, this.maxTitleLength - 1) + '...'
            : this.video.title;
    }

    public get description(): string {
        return this.maxDescriptionLength &&
            this.video?.description?.length > this.maxDescriptionLength
            ? this.video.description.slice(0, this.maxDescriptionLength - 1) +
                  '...'
            : this.video.description;
    }
}
