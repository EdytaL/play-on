import { VideoListingResponse } from '../../shared/models/listing-response.model'

export class FetchVideoFeedList {
    public static readonly type = '[Video Feed] Fetch Video List'
    constructor() {}
}

export class FetchVideoFeedListSuccess {
    static readonly type = '[Video Feed] Fetch Video List success'
    constructor(public payload: VideoListingResponse) {}
}
export class FetchVideoFeedListFailure {
    static readonly type = '[Video Feed] Fetch Video Lis failure'
    constructor(public payload: any) {}
}

export class ChangePage {
    static readonly type = '[Video Feed] Change Page'
    constructor(public readonly payload: number) {}
}
