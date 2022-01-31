import {Component, Input, OnInit} from '@angular/core';
import {Station} from '@sb/models/station';

@Component({
  selector: 'app-station-search-result',
  templateUrl: './station-search-result.component.html',
  styleUrls: ['./station-search-result.component.scss']
})
export class StationSearchResultComponent implements OnInit {
  // The station data searched by `BusSearchModalComponent`.
  @Input() station!: Station;

  constructor() {
  }

  ngOnInit(): void {
  }

}
