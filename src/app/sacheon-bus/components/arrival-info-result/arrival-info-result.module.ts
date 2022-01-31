import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArrivalInfoResultComponent} from './arrival-info-result.component';
import {TimerComponent} from './timer/timer.component';
import {TextModule} from '@sb/components/text/text.module';
import {BusTrackingComponent} from './bus-tracking/bus-tracking.component';
import {IconModule} from '@tk-ui/components/icon/icon.module';


@NgModule({
  declarations: [
    ArrivalInfoResultComponent,
    TimerComponent,
    BusTrackingComponent,
  ],
  exports: [
    ArrivalInfoResultComponent
  ],
  imports: [
    CommonModule,
    TextModule,
    IconModule
  ]
})
export class ArrivalInfoResultModule {
}
