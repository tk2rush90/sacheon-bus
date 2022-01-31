import {Component, Input, OnInit} from '@angular/core';
import {ArrivalInfo} from '@sb/models/arrival-info';
import {ParsingUtil} from '@tk-ui/utils/parsing.util';

@Component({
  selector: 'app-arrival-info-result',
  templateUrl: './arrival-info-result.component.html',
  styleUrls: ['./arrival-info-result.component.scss']
})
export class ArrivalInfoResultComponent implements OnInit {
  // Remaining time to arrive.
  time = 0;

  // Remaining stations count.
  stations = 0;

  constructor() {
  }

  // Arrival info.
  private _arrival!: ArrivalInfo;

  /**
   * Get arrival info.
   */
  get arrival(): ArrivalInfo {
    return this._arrival;
  }

  /**
   * Set arrival info.
   * @param arrival Arrival info.
   */
  @Input() set arrival(arrival: ArrivalInfo) {
    this._arrival = arrival;
    this._setRemainingTime();
    this._setRemainingStations();
  }

  ngOnInit(): void {
  }

  /**
   * The `remainingTime` formatted as `MM 분 후`.
   * So remove the ` 분 후` from the text and parse to integer.
   */
  private _setRemainingTime(): void {
    const replaced = this.arrival.remainingTime.replace(' 분 후', '');

    this.time = ParsingUtil.toInteger(replaced);
  }

  /**
   * Parse the `remainingCount` as number.
   */
  private _setRemainingStations(): void {
    this.stations = ParsingUtil.toInteger(this.arrival.remainingCount);
  }
}
