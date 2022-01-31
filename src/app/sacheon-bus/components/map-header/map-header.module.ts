import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapHeaderComponent} from './map-header.component';
import {IconModule} from '@tk-ui/components/icon/icon.module';
import {TextModule} from '@sb/components/text/text.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    MapHeaderComponent
  ],
  exports: [
    MapHeaderComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    TextModule,
    RouterModule
  ]
})
export class MapHeaderModule {
}
