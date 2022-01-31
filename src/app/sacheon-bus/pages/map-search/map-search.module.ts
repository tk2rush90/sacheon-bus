import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapSearchComponent} from './map-search.component';
import {MapHeaderModule} from '@sb/components/map-header/map-header.module';
import {MapDrawerModule} from '@sb/components/map-drawer/map-drawer.module';
import {MapModule} from '@sb/components/map/map.module';


@NgModule({
  declarations: [
    MapSearchComponent
  ],
  imports: [
    CommonModule,
    MapHeaderModule,
    MapDrawerModule,
    MapModule
  ],
  exports: [
    MapSearchComponent,
  ]
})
export class MapSearchModule {
}
