import {Component, Inject, OnInit} from '@angular/core';
import {MODAL_DATA, MODAL_REF, ModalRef} from '@tk-ui/components/modal/models/modal-ref';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';
import {BusApiService} from '@sb/services/api/bus-api.service';
import {finalize} from 'rxjs';
import {Station} from '@sb/models/station';
import {ToastService} from '@tk-ui/components/toast/service/toast.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FavoriteStationService} from '@sb/services/common/favorite-station.service';
import {ModalService} from '@tk-ui/components/modal/services/modal.service';
import {SortUtil} from '@tk-ui/utils/sort.util';

@Component({
  selector: 'app-bus-search-modal',
  templateUrl: './bus-search-modal.component.html',
  styleUrls: [
    '../styles/modal-default-style.scss',
    './bus-search-modal.component.scss'
  ],
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

  // Raw favorite stations.
  private _favorites: Station[] = [];

  // Map favorite stations with id to check the loaded stations are favorite or not.
  private _favoritesMap: {[k: string]: Station} = {};

  constructor(
    // Previous selected station data.
    @Inject(MODAL_DATA) private data: Station | undefined,
    @Inject(MODAL_REF) private modalRef: ModalRef<BusSearchModalComponent>,
    private modalService: ModalService,
    private toastService: ToastService,
    private busApiService: BusApiService,
    private favoriteStationService: FavoriteStationService,
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
    this._subscribeFavoriteStations();
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
        next: res => {
          this.stations = res;

          // Check the favorite state of stations.
          this.favoriteStationService.checkTheFavoriteStations(this.stations, this._favoritesMap);

          // Sort stations by favorite state.
          // This only works when the data first loaded.
          this._sortStationsByFavorite();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          // Clear stations to display no-data message.
          this.stations = [];

          if (err.status !== 400) {
            this.toastService.error('오류가 발생했습니다');
          }
        },
      });

    this.subscriptionService.store('_getStationList', sub);
    this.loading = true;
  }

  /**
   * Subscribe favorite stations data.
   */
  private _subscribeFavoriteStations(): void {
    const sub = this.favoriteStationService.subscribe(res => {
      this._favorites = res.favorites;
      this._favoritesMap = res.favoritesMap;

      // Check the favorite state of stations.
      this.favoriteStationService.checkTheFavoriteStations(this.stations, this._favoritesMap);
    });

    this.subscriptionService.store('_subscribeFavoriteStations', sub);
  }

  /**
   * Sort the stations by favorite.
   */
  private _sortStationsByFavorite(): void {
    const sortFunction = SortUtil.sortMethodWithOrderByColumn<Station>({
      property: 'favorite',
      // Read boolean value as number.
      type: 'boolean',
      // Order by `true(1)` to `false(0)`
      order: 'desc',
    });

    this.stations = this.stations.sort(sortFunction);
  }
}
