import { VideoListingResponse } from '../../shared/models/listing-response.model';
import { VideoDetails } from '../../shared/models/video-details-model';

export class FetchVideoFeedList {
    public static readonly type = '[Video Feed] Fetch Video List';
    constructor(public payload: string) {}
}

export class FetchVideoFeedListSuccess {
    static readonly type = '[Video Feed] Fetch Video List success';
    constructor(public payload: VideoListingResponse) {}
}
export class FetchVideoFeedListFailure {
    static readonly type = '[Video Feed] Fetch Video Lis failure';
    constructor(public payload: any) {}
}

export class ChangePage {
    static readonly type = '[Video Feed] Change Page';
    constructor(public readonly payload: number) {}
}

export class SelectVideo {
    static readonly type = '[Video Feed] Select Video to Display';
    constructor(public readonly payload: VideoDetails) {}
}

export class ClearSelectedVideo {
    static readonly type = '[Video Feed] Clear Selected Video State';
    constructor() {}
}
