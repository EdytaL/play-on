import { Injectable } from '@angular/core'
import { EnvironmentService } from '../../core/services/environment.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { VideoListingResponse } from '../../shared/models/listing-response.model'
import { Observable } from 'rxjs'

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
        limit: number
    ): Observable<VideoListingResponse> {
        const url =
            this.environmentService.contentListUrl +
            '?f[mediaType]=Video&limit=' +
            limit +
            '&offset=' +
            offset
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        })
        return this.http.get<VideoListingResponse>(url, { headers: headers })
    }
}
