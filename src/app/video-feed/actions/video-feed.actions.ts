import { VideoListingResponse } from '../../shared/models/listing-response.model'

export class FetchVideoFeedList {
    public static readonly type = '[VideoFeed] Fetch Video List'
    constructor() {}
}

export class FetchVideoFeedListSuccess {
    static readonly type = '[VideoFeed] Fetch Video List success'
    constructor(public payload: VideoListingResponse) {}
}
export class FetchVideoFeedListFailure {
    static readonly type = '[VideoFeed] Fetch Video Lis failure'
    constructor(public payload: any) {}
}
