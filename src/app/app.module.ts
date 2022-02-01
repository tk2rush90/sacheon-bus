import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MainModule} from '@sb/pages/main/main.module';
import {ModalModule} from '@tk-ui/components/modal/modal.module';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MapSearchModule} from '@sb/pages/map-search/map-search.module';
import {CoreHttpInterceptor} from '@sb/services/interceptors/core-http-interceptor';
import {ToastModule} from '@tk-ui/components/toast/toast.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MainModule,
    ModalModule,
    BrowserAnimationsModule,
    MapSearchModule,
    ToastModule,
  ],
  providers: [
    SubscriptionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CoreHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
