import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {finalize} from 'rxjs';
import {BusApiService} from '@sb/services/api/bus-api.service';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';
import {Station} from '@sb/models/station';
import {ArrivalInfo} from '@sb/models/arrival-info';
import {BusTimerService} from '@sb/services/common/bus-timer.service';
import {SelectedStationService} from '@sb/services/common/selected-station.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class MainComponent implements OnInit, AfterViewInit {
  // State of fixing header on top.
  fixHeader = false;
  // Arrival info list for selected station.
  arrivals?: ArrivalInfo[] = [];
  // Search arrival info loading state.
  loading = false;
  // Selected station by `BusSearchComponent`.
  station?: Station;

  constructor(
    private busApiService: BusApiService,
    private busTimerService: BusTimerService,
    private selectedStationService: SelectedStationService,
    private subscriptionService: SubscriptionService,
  ) {
  }

  /**
   * Get the state of no result.
   */
  get noResult(): boolean {
    return !!this.station && (this.arrivals?.length || 0) === 0;
  }

  ngOnInit(): void {
    this._subscribeTimerEnded();
    this._subscribeSelectedStation();
  }

  ngAfterViewInit(): void {
    this._checkScrollPosition();
  }

  /**
   * Listen window scroll to detect header fixed state.
   */
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this._checkScrollPosition();
  }

  /**
   * Get arrival info list with selected station.
   * After getting the result, start timer to run next api call.
   * @param loading Use loading.
   */
  private _getArrivalInfo(loading = true): void {
    const sub = this.busApiService
      .getArrivalInfo(this.station!.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          this.arrivals = res;
          this.busTimerService.startTimer();
        },
        error: err => {
          console.error(err);
        },
      });

    this.subscriptionService.store('_getArrivalInfo', sub);

    if (loading) {
      this.loading = true;
    }
  }

  /**
   * Subscribe timer ended emitter to call api.
   */
  private _subscribeTimerEnded(): void {
    const sub = this.busTimerService
      .subscribeTimerEnded(() => {
        this._getArrivalInfo(false);
      });

    this.subscriptionService.store('_subscribeTimerEnded', sub);
  }

  /**
   * Subscribe selected station.
   */
  private _subscribeSelectedStation(): void {
    const sub = this.selectedStationService
      .station$
      .subscribe(res => {
        this._onStationChange(res);
      });

    this.subscriptionService.store('_subscribeSelectedStation', sub);
  }

  /**
   * Get arrival info when selected station changed.
   * @param station changed station
   */
  private _onStationChange(station?: Station): void {
    this.station = station;

    if (this.station) {
      this._getArrivalInfo();
    }
  }

  /**
   * Check the window scroll position to set header fixed.
   */
  private _checkScrollPosition(): void {
    // The `208` is logo container height
    this.fixHeader = window.scrollY > 208;
  }
}
