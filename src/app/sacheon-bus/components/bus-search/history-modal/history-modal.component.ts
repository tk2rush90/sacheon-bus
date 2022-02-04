import {Component, Inject, OnInit} from '@angular/core';
import {RecentStationService} from '@sb/services/common/recent-station.service';
import {MODAL_REF, ModalRef} from '@tk-ui/components/modal/models/modal-ref';
import {ModalService} from '@tk-ui/components/modal/services/modal.service';
import {Station} from '@sb/models/station';
import {SelectedStationService} from '@sb/services/common/selected-station.service';
import {FavoriteStationService} from '@sb/services/common/favorite-station.service';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: [
    '../styles/modal-default-style.scss',
    './history-modal.component.scss'
  ],
  providers: [
    SubscriptionService,
  ]
})
export class HistoryModalComponent implements OnInit {
  // Recent stations.
  stations: Station[] = [];

  constructor(
    @Inject(MODAL_REF) private modalRef: ModalRef<HistoryModalComponent>,
    private modalService: ModalService,
    private recentStationService: RecentStationService,
    private favoriteStationService: FavoriteStationService,
    private selectedStationService: SelectedStationService,
    private subscriptionService: SubscriptionService,
  ) { }

  /**
   * Get state of having searched stations.
   */
  get hasStations(): boolean {
    return this.stations.length > 0;
  }

  ngOnInit(): void {
    this.stations = this.recentStationService.getRecentStations();
    this._subscribeFavoriteStations();
  }

  /**
   * Close the modal
   */
  close(): void {
    this.modalRef.close();
  }

  /**
   * Update the selected station and close all opened modals.
   * @param station Selected station.
   */
  onClickStation(station: Station): void {
    this.selectedStationService.station = station;
    this.modalService.closeAll();
  }

  /**
   * Subscribe the favorite stations data.
   */
  private _subscribeFavoriteStations(): void {
    const sub = this.favoriteStationService
      .subscribe(res => {
        // Check the favorite state when favorite data changed.
        this.favoriteStationService.checkTheFavoriteStations(this.stations, res.favoritesMap);
      });

    this.subscriptionService.store('_subscribeFavoriteStations', sub);
  }
}
