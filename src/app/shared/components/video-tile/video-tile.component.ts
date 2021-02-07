import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VideoDetails } from '../../models/video-details-model';
import { EnvironmentService } from '../../../core/services/environment.service';

@Component({
    selector: 'app-video-tile',
    templateUrl: './video-tile.component.html',
    styleUrls: ['./video-tile.component.less'],
})
export class VideoTileComponent implements OnInit {
    @Input() item: VideoDetails | undefined;

    @Output() videoSelected: EventEmitter<VideoDetails> = new EventEmitter();

    form: FormGroup | undefined;
    imageUrl: string | undefined;

    constructor(
        private fb: FormBuilder,
        private environmentService: EnvironmentService
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({});
        this.imageUrl = this.item?.imageUrl
            ? this.item?.imageUrl
            : this.environmentService.placeholderThumbnailImage;
    }

    ngAfterViewInit(): void {}

    emitSelectedVideo(selectedVideo: VideoDetails): void {
        this.videoSelected.emit(selectedVideo);
    }
}
