import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusSearchComponent} from './bus-search.component';
import {IconModule} from '@tk-ui/components/icon/icon.module';
import {TextModule} from '@sb/components/text/text.module';
import {SearchModule} from '@sb/components/search/search.module';
import {FlatButtonModule} from '@tk-ui/components/flat-button/flat-button.module';
import {BusSearchModalComponent} from '@sb/components/bus-search/bus-search-modal/bus-search-modal.component';
import {StationSearchResultComponent} from './station-search-result/station-search-result.component';
import {StationNameModule} from '@sb/components/station-name/station-name.module';
import {LoadingModule} from '@sb/components/loading/loading.module';
import {RouterModule} from '@angular/router';
import {IconButtonModule} from '@sb/components/icon-button/icon-button.module';
import { FavoriteModalComponent } from './favorite-modal/favorite-modal.component';
import { HistoryModalComponent } from './history-modal/history-modal.component';


@NgModule({
  declarations: [
    BusSearchComponent,
    BusSearchModalComponent,
    StationSearchResultComponent,
    FavoriteModalComponent,
    HistoryModalComponent,
  ],
  exports: [
    BusSearchComponent,
  ],
  imports: [
    CommonModule,
    IconModule,
    TextModule,
    SearchModule,
    FlatButtonModule,
    StationNameModule,
    LoadingModule,
    RouterModule,
    IconButtonModule,
  ],
})
export class BusSearchModule {
}
