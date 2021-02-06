export class FetchVideoFeedList {
    public static readonly type = '[VideoFeed] Fetch Video List'
    constructor() {}
}

export class FetchVideoFeedListSuccess {
    static readonly type = '[VideoFeed] Fetch Video List success'
    constructor(public payload: any[]) {}
}
export class FetchVideoFeedListFailure {
    static readonly type = '[VideoFeed] Fetch Video Lis failure'
    constructor(public payload: any) {}
}
