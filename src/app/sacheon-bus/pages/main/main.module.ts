import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {LogoModule} from '@sb/components/logo/logo.module';
import {ContainerModule} from '@sb/components/container/container.module';
import {BusSearchModule} from '@sb/components/bus-search/bus-search.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    LogoModule,
    ContainerModule,
    BusSearchModule
  ],
  exports: [
    MainComponent,
  ]
})
export class MainModule {
}
