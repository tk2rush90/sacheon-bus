import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StationNameComponent} from './station-name.component';
import {TextModule} from '@sb/components/text/text.module';


@NgModule({
  declarations: [
    StationNameComponent
  ],
  exports: [
    StationNameComponent
  ],
  imports: [
    CommonModule,
    TextModule
  ]
})
export class StationNameModule {
}
