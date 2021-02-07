import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

registerLocaleData(en);

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        IconsProviderModule,
        NzMenuModule,
        CoreModule,
        NgxsModule.forRoot([], {
            developmentMode: !environment.production,
        }),
        NgxsLoggerPluginModule.forRoot(),
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }],
    bootstrap: [AppComponent],
})
export class AppModule {}
