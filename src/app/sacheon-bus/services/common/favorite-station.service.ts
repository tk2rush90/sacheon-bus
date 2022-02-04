import {Injectable} from '@angular/core';
import {StorageService} from '@tk-ui/services/common/storage.service';
import {Station} from '@sb/models/station';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';

export interface FavoriteStationMap {
  [k: string]: Station;
}

export const FAVORITE_STATION_KEY = 'FAVORITE_STATION_KEY';

@Injectable({
  providedIn: 'root'
})
export class FavoriteStationService {
  // Favorite stations.
  private _favorites$: BehaviorSubject<Station[]> = new BehaviorSubject<Station[]>([]);

  // Favorite station map.
  private _favoritesMap$: BehaviorSubject<FavoriteStationMap> = new BehaviorSubject<FavoriteStationMap>({});

  constructor(
    private storageService: StorageService,
  ) { }

  /**
   * Initialize the favorite stations.
   */
  initialize(): void {
    this._favorites$.next(this.getFavoriteStations());
    this._createFavoriteStationsMap();
  }

  /**
   * Set favorite stations to local storage.
   * @param stations Favorite stations.
   */
  setFavoriteStations(stations: Station[]): void {
    this.storageService.setToLocal(FAVORITE_STATION_KEY, stations);
  }

  /**
   * Get favorite stations from the local storage.
   */
  getFavoriteStations(): Station[] {
    const result = this.storageService.getFromLocal<Station[]>(FAVORITE_STATION_KEY);

    return result || [];
  }

  /**
   * Toggle the station favorite state.
   * @param station Station to toggle.
   */
  toggleStationFavorite(station: Station): void {
    const favorites = this.getFavoriteStations();

    const index = favorites.findIndex(item => item.id === station.id);

    if (index === -1) {
      favorites.push(station);
    } else {
      favorites.splice(index, 1);
    }

    // Update the stored favorites and favorite map.
    this.updateFavoriteStations(favorites);
  }

  /**
   * Update the favorite stations.
   * This only updates the `_favoriteMap` and local stored favorite stations.
   * The `_favorites` should be updated before calling this method.
   * @param favorites Updated stations.
   */
  updateFavoriteStations(favorites: Station[]): void {
    this.setFavoriteStations(favorites);

    // Update `_favorites$` to notice to subscribers.
    this._favorites$.next(favorites);

    this._createFavoriteStationsMap();
  }

  /**
   * Check the favorite stations with loaded data.
   * @param stations Stations to check.
   * @param favoritesMap The map of favorite station ids.
   */
  checkTheFavoriteStations(stations: Station[], favoritesMap: FavoriteStationMap): void {
    stations.forEach(item => {
      item.favorite = !!favoritesMap[item.id];
    });
  }

  /**
   * Subscribe the favorites.
   * @param handler Observable handler.
   */
  subscribe(handler: (res: {favorites: Station[], favoritesMap: FavoriteStationMap}) => void): Subscription {
    return combineLatest([
    this._favorites$.asObservable(),
    this._favoritesMap$.asObservable(),
  ]).subscribe(res => {
      handler({
        favorites: res[0],
        favoritesMap: res[1],
      });
    });
  }

  /**
   * Create favorite stations map.
   */
  private _createFavoriteStationsMap(): void {
    const favorites = this.getFavoriteStations();
    const favoritesMap: FavoriteStationMap = {};

    favorites.forEach(item => {
      favoritesMap[item.id] = item;
    });

    // Update `_favoritesMap$` to notice to subscribers.
    this._favoritesMap$.next(favoritesMap);
  }
}
