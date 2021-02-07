import { Injectable } from '@angular/core';
import { EnvironmentService } from '../../core/services/environment.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { VideoListingResponse } from '../../shared/models/listing-response.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class VideoFeedService {
    constructor(
        private environmentService: EnvironmentService,
        private http: HttpClient
    ) {}

    getVideoList(
        offset: number,
        limit: number,
        searchPhrase: string
    ): Observable<VideoListingResponse> {
        let url = this.environmentService.contentListUrl;

        let params = new HttpParams({
            fromObject: {
                'f[mediaType]': 'Video',
                limit: limit.toString(),
                offset: offset.toString(),
            },
        });
        if (searchPhrase != null) {
            params = params.set('q', searchPhrase);
        }
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.get<VideoListingResponse>(url, {
            headers: headers,
            params: params,
        });
    }
}
