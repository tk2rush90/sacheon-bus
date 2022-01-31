import {Component, Inject, OnInit} from '@angular/core';
import {MODAL_DATA, MODAL_REF, ModalRef} from '@tk-ui/components/modal/models/modal-ref';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';
import {BusApiService} from '@sb/services/api/bus-api.service';
import {finalize} from 'rxjs';
import {Station} from '@sb/models/station';

@Component({
  selector: 'app-bus-search-modal',
  templateUrl: './bus-search-modal.component.html',
  styleUrls: ['./bus-search-modal.component.scss'],
  providers: [
    SubscriptionService,
  ]
})
export class BusSearchModalComponent implements OnInit {
  // Search text.
  search = '';

  // Search loading state.
  loading = false;

  // Searched station list.
  stations: Station[] = [];

  constructor(
    // Previous selected station data.
    @Inject(MODAL_DATA) private data: Station | undefined,
    @Inject(MODAL_REF) private modalRef: ModalRef<BusSearchModalComponent>,
    private busApiService: BusApiService,
    private subscriptionService: SubscriptionService,
  ) {
  }

  /**
   * Get state of having searched stations.
   */
  get hasStations(): boolean {
    return this.stations.length > 0;
  }

  ngOnInit(): void {
    this._setPreviousStation();
  }

  /**
   * Close the modal with response.
   * @param res response
   */
  close(res?: Station): void {
    this.modalRef.close(res);
  }

  /**
   * Update the `search` property and call endpoint to get search result.
   * @param search search text
   */
  onSearchChange(search: string): void {
    this.search = search;
    this._getStationList();
  }

  /**
   * If previous station data exists, set to `search` and get station list.
   */
  private _setPreviousStation(): void {
    if (this.data) {
      this.search = this.data.name;
      this._getStationList();
    }
  }

  /**
   * Get station list with `search` text.
   */
  private _getStationList(): void {
    const sub = this.busApiService
      .getStationList(this.search || '')
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => this.stations = res,
        error: err => {
          console.error(err);
          // Clear stations to display no-data message.
          this.stations = [];
        },
      });

    this.subscriptionService.store('_getStationList', sub);
    this.loading = true;
  }
}
