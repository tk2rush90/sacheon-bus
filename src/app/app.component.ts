import {Component} from '@angular/core';
import {FavoriteStationService} from '@sb/services/common/favorite-station.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sacheon-bus';

  constructor(
    private favoriteStationService: FavoriteStationService,
  ) {
    this.favoriteStationService.initialize();
  }
}
