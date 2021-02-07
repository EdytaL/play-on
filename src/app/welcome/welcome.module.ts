import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './containers/welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

@NgModule({
    declarations: [WelcomeComponent],
    imports: [
        CommonModule,
        NgxsModule.forFeature([]),
        RouterModule.forChild([
            {
                path: '',
                component: WelcomeComponent,
                children: [],
            },
        ]),
    ],
})
export class WelcomeModule {}
