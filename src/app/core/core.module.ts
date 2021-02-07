import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './containers/layout/layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NavbarComponent } from './containers/navbar/navbar.component';
import { FooterComponent } from './containers/footer/footer.component';
import { WelcomeModule } from '../welcome/welcome.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NotFoundPageComponent } from '../shared/components/not-found-page/not-found-page.component';

@NgModule({
    declarations: [LayoutComponent, NavbarComponent, FooterComponent],
    imports: [
        CommonModule,
        WelcomeModule,

        RouterModule.forRoot([
            {
                path: '',
                component: LayoutComponent,
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'welcome' },
                    {
                        path: 'welcome',
                        loadChildren: () =>
                            import('../welcome/welcome.module').then(
                                (m) => m.WelcomeModule
                            ),
                    },
                    {
                        path: 'videos',
                        loadChildren: () =>
                            import('../video-feed/video-feed.module').then(
                                (m) => m.VideoFeedModule
                            ),
                    },
                    { path: '404', component: NotFoundPageComponent },
                    { path: '**', component: NotFoundPageComponent },
                ],
            },
        ]),
        NzLayoutModule,
        NzIconModule,
    ],
})
export class CoreModule {}
