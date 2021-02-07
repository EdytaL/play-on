import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoTileComponent } from './components/video-tile/video-tile.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { VideoDetailsComponent } from './components/video-details/video-details.component';
import { VideoTileSkeletonComponent } from './components/video-tile-skeleton/video-tile-skeleton.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { EmptyResultsComponent } from './components/empty-results/empty-results.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { VgStreamingModule } from '@videogular/ngx-videogular/streaming';

@NgModule({
    declarations: [
        VideoTileComponent,
        VideoPlayerComponent,
        SearchBarComponent,
        VideoDetailsComponent,
        VideoTileSkeletonComponent,
        NotFoundPageComponent,
        EmptyResultsComponent,
        ErrorPageComponent,
    ],
    imports: [
        CommonModule,
        NzIconModule,
        RouterModule,
        NzCardModule,
        FormsModule,
        NzCheckboxModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        ReactiveFormsModule,
        NzInputModule,
        NzSkeletonModule,
        NzEmptyModule,
        VgStreamingModule,
    ],
    exports: [
        VideoTileComponent,
        VideoPlayerComponent,
        SearchBarComponent,
        VideoDetailsComponent,
        VideoTileSkeletonComponent,
        EmptyResultsComponent,
        ErrorPageComponent,
    ],
})
export class SharedModule {}
