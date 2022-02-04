import {Injectable} from '@angular/core';
import {Station} from '@sb/models/station';
import {BehaviorSubject, Observable} from 'rxjs';
import {RecentStationService} from '@sb/services/common/recent-station.service';

@Injectable({
  providedIn: 'root'
})
export class SelectedStationService {
  constructor(
    private recentStationService: RecentStationService,
  ) {
  }

  // Selected station to get arrival info.
  private _station$: BehaviorSubject<Station | undefined> = new BehaviorSubject<Station | undefined>(undefined);

  /**
   * Get selected station as observable.
   */
  get station$(): Observable<Station | undefined> {
    return this._station$.asObservable();
  }

  /**
   * Set selected station.
   * @param station Selected station.
   */
  set station(station: Station | undefined) {
    this._station$.next(station);

    if (station) {
      // Append to recently searched station.
      this.recentStationService.appendRecentStation(station);
    }
  }
}
