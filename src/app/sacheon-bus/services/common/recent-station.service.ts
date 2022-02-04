import {Injectable} from '@angular/core';
import {StorageService} from '@tk-ui/services/common/storage.service';
import {Station} from '@sb/models/station';

export const RECENT_STATIONS_KEY = 'RECENT_STATIONS_KEY';

@Injectable({
  providedIn: 'root'
})
export class RecentStationService {

  constructor(
    private storageService: StorageService,
  ) { }

  /**
   * Set recent stations.
   * @param stations Stations.
   */
  setRecentStations(stations: Station[]): void {
    this.storageService.setToLocal(RECENT_STATIONS_KEY, stations);
  }

  /**
   * Get recent stations from the local storage.
   */
  getRecentStations(): Station[] {
    const result = this.storageService.getFromLocal<Station[]>(RECENT_STATIONS_KEY);

    return result || [];
  }

  /**
   * Append recent station.
   * The station will be added at the top of the list.
   * @param station Station.
   */
  appendRecentStation(station: Station): void {
    const stations = this.getRecentStations();
    const index = stations.findIndex(item => item.id === station.id);

    if (index !== -1) {
      stations.splice(index, 1);
    }

    stations.unshift(station);

    this.setRecentStations(stations);
  }
}
