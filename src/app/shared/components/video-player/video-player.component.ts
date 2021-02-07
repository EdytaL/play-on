import { Component, Input, OnInit } from '@angular/core';
import { VideoDetails } from '../../models/video-details-model';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { Resource, ResourceType } from '../../models/resource-model';

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.less'],
})
export class VideoPlayerComponent implements OnInit {
    @Input() video: VideoDetails | undefined;
    currentVideo: Resource | undefined;
    data: VgApiService | undefined;

    constructor() {}

    ngOnInit(): void {
        this.currentVideo = this.video.resources.filter(
            (item) => item.type == ResourceType.VIDEO
        )[0];
    }

    // TODO make work video quality
    // private mapVideoToBitrates(resources: Resource[]): BitrateOptions[] {
    //   let bitrates: BitrateOptions[] = [];
    //   resources.filter(item => item.type != ResourceType.IMAGE).map(item => {
    //     bitrates.push({
    //       qualityIndex: item.height,
    //       width: item.width,
    //       height: item.height,
    //       bitrate: item.height == 360 ? 1 : 5,
    //       mediaType: 'video',
    //       label: item.height.toString() + 'px'
    //     })
    //   })
    //
    //   return bitrates
    // }

    videoPlayerInit(data: VgApiService) {
        this.data = data;

        this.data
            .getDefaultMedia()
            .subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    }

    initVdo() {
        // @ts-ignore
        this.data.play();
    }
}
