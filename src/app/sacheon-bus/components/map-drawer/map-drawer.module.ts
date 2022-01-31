import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapDrawerComponent} from './map-drawer.component';
import {StationItemComponent} from './station-item/station-item.component';
import {StationNameModule} from '@sb/components/station-name/station-name.module';
import {TextModule} from '@sb/components/text/text.module';


@NgModule({
  declarations: [
    MapDrawerComponent,
    StationItemComponent
  ],
  exports: [
    MapDrawerComponent
  ],
  imports: [
    CommonModule,
    StationNameModule,
    TextModule
  ]
})
export class MapDrawerModule {
}
