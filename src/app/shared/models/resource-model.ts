export interface Resource {
    id: string;
    type: ResourceType;
    url: string;
    width: number;
    height: number;
}

export enum ResourceType {
    VIDEO = 'proxy_normal',
    VIDEO_HD = 'proxy_hd_720',
    IMAGE = 'reference_keyframe',
}
