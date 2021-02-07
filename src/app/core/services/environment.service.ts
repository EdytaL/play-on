import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class EnvironmentService {
    constructor() {}

    public get contentListUrl(): string {
        return environment.contentListUrl;
    }

    public get placeholderThumbnailImage(): string {
        return environment.placeholderThumbnailImage;
    }
}
