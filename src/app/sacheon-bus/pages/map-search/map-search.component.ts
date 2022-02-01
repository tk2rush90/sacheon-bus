import {Component, OnInit} from '@angular/core';
import {Coordinates} from '@sb/models/coordinates';
import {BusApiService} from '@sb/services/api/bus-api.service';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';
import {Station} from '@sb/models/station';
import {SelectedStationService} from '@sb/services/common/selected-station.service';
import {Router} from '@angular/router';
import {ToastService} from '@tk-ui/components/toast/service/toast.service';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class MapSearchComponent implements OnInit {
  // Stations to display on map.
  stations: Station[] = [];

  // Selected station.
  selectedStation?: Station;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private busApiService: BusApiService,
    private selectedStationService: SelectedStationService,
    private subscriptionService: SubscriptionService,
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * Call api to get station list with coordinates.
   * @param coordinates Changed coordinates.
   */
  onCoordinatesChange(coordinates: Coordinates): void {
    this._getStationPoints(coordinates);
  }

  /**
   * Update selected station.
   * @param station Selected station.
   */
  onStationSelected(station: Station): void {
    this.selectedStation = station;
  }

  /**
   * Set to global selected station to get arrival info.
   * @param station Confirmed station.
   */
  onStationConfirmed(station: Station): void {
    this.selectedStationService.station = station;
    this.router.navigate(['/main']);
  }

  /**
   * Get station point list to display on map.
   * @param coordinates Changed coordinates.
   */
  private _getStationPoints(coordinates: Coordinates): void {
    const sub = this.busApiService
      .getStationPoints(coordinates)
      .subscribe({
        next: res => {
          this.stations = res;
          this._checkSelectedStation();
        },
        error: err => {
          console.error(err);

          this.toastService.error('오류가 발생했습니다');
        },
      });

    this.subscriptionService.store('_getStationPoints', sub);
  }

  /**
   * When the `selectedStation` doesn't exist in the `stations`,
   * remove it to unset the highlight of the map overlay.
   */
  private _checkSelectedStation(): void {
    if (this.selectedStation) {
      const find = this.stations.find(item => item.id === this.selectedStation!.id);

      if (!find) {
        this.selectedStation = undefined;
      }
    }
  }
}
