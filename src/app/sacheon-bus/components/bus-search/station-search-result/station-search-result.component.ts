import {Component, Input, OnInit} from '@angular/core';
import {Station} from '@sb/models/station';
import {IconDefinitions} from '@tk-ui/components/icon/icon-defs';
import {EventUtil} from '@tk-ui/utils/event.util';
import {FavoriteStationService} from '@sb/services/common/favorite-station.service';

@Component({
  selector: 'app-station-search-result',
  templateUrl: './station-search-result.component.html',
  styleUrls: ['./station-search-result.component.scss']
})
export class StationSearchResultComponent implements OnInit {
  // The station data searched by `BusSearchModalComponent`.
  @Input() station!: Station;

  constructor(
    private favoriteStationService: FavoriteStationService,
  ) {
  }

  /**
   * Get the star icon by favorite state.
   */
  get starIcon(): keyof typeof IconDefinitions {
    return this.station.favorite ? 'star' : 'star-border';
  }

  ngOnInit(): void {
  }

  /**
   * When click star button, toggle the favorite state.
   * @param event Mouse event.
   */
  onClickStar(event: MouseEvent): void {
    EventUtil.neutralize(event);

    this.favoriteStationService.toggleStationFavorite(this.station);
  }
}
