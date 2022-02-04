import {Component, Inject, OnInit} from '@angular/core';
import {MODAL_REF, ModalRef} from '@tk-ui/components/modal/models/modal-ref';
import {Station} from '@sb/models/station';
import {FavoriteStationService} from '@sb/services/common/favorite-station.service';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';
import {ModalService} from '@tk-ui/components/modal/services/modal.service';
import {SelectedStationService} from '@sb/services/common/selected-station.service';

@Component({
  selector: 'app-favorite-modal',
  templateUrl: './favorite-modal.component.html',
  styleUrls: [
    '../styles/modal-default-style.scss',
    './favorite-modal.component.scss'
  ],
  providers: [
    SubscriptionService,
  ]
})
export class FavoriteModalComponent implements OnInit {
  // Favorite stations.
  stations: Station[] = [];

  constructor(
    @Inject(MODAL_REF) private modalRef: ModalRef<FavoriteModalComponent>,
    private modalService: ModalService,
    private selectedStationService: SelectedStationService,
    private favoriteStationService: FavoriteStationService,
    private subscriptionService: SubscriptionService,
  ) { }

  /**
   * Get state of having searched stations.
   */
  get hasStations(): boolean {
    return this.stations.length > 0;
  }

  ngOnInit(): void {
    this._subscribeFavoriteStations();
  }

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
        this.stations = res.favorites;

        // The all stations in this component should have `favorite` property as `true`.
        this.stations.forEach(item => item.favorite = true);
      });

    this.subscriptionService.store('_subscribeFavoriteStations', sub);
  }
}
