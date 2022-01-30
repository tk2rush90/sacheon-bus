import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusSearchComponent} from './bus-search.component';
import {IconModule} from '@tk-ui/components/icon/icon.module';
import {TextModule} from '@sb/components/text/text.module';
import {SearchModule} from '@sb/components/search/search.module';
import {FlatButtonModule} from '@tk-ui/components/flat-button/flat-button.module';
import {BusSearchModalComponent} from './bus-search-modal/bus-search-modal.component';


@NgModule({
  declarations: [
    BusSearchComponent,
    BusSearchModalComponent,
  ],
  exports: [
    BusSearchComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    TextModule,
    SearchModule,
    FlatButtonModule,
  ]
})
export class BusSearchModule {
}
