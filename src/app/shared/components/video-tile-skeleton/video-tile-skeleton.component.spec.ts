import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTileSkeletonComponent } from './video-tile-skeleton.component';

describe('VideoTileSkeletonComponent', () => {
    let component: VideoTileSkeletonComponent;
    let fixture: ComponentFixture<VideoTileSkeletonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VideoTileSkeletonComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VideoTileSkeletonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
