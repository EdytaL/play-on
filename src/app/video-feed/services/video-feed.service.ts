import { Injectable } from '@angular/core'
import { EnvironmentService } from '../../core/services/environment.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
    providedIn: 'root',
})
export class VideoFeedService {
    constructor(
        private environmentService: EnvironmentService,
        private http: HttpClient
    ) {}

    getVideoList() {
        const url = this.environmentService.contentListUrl
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        })
        return this.http.get<any>(url, { headers: headers })
    }
}
