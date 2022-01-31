import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {LogoModule} from '@sb/components/logo/logo.module';
import {ContainerModule} from '@sb/components/container/container.module';
import {BusSearchModule} from '@sb/components/bus-search/bus-search.module';
import {LoadingModule} from '@sb/components/loading/loading.module';
import {ArrivalInfoResultModule} from '@sb/components/arrival-info-result/arrival-info-result.module';
import {TextModule} from '@sb/components/text/text.module';
import {HeaderModule} from '@sb/components/header/header.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    LogoModule,
    ContainerModule,
    BusSearchModule,
    LoadingModule,
    ArrivalInfoResultModule,
    TextModule,
    HeaderModule,
  ],
  exports: [
    MainComponent,
  ]
})
export class MainModule {
}
