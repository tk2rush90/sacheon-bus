import {AfterViewInit, Component, HostListener, Input, OnInit} from '@angular/core';
import {ArrivalInfo} from '@sb/models/arrival-info';

export interface Track {
  index: number;
  isBus: boolean;
}

@Component({
  selector: 'app-bus-tracking',
  templateUrl: './bus-tracking.component.html',
  styleUrls: ['./bus-tracking.component.scss']
})
export class BusTrackingComponent implements OnInit, AfterViewInit {
  // Arrival info.
  @Input() arrival!: ArrivalInfo;

  // Tracking stations.
  tracks: Track[] = [];

  // Renderable track counts.
  private _trackCount = 10;

  constructor() {
  }

  // Remaining stations.
  private _stations!: number;

  /**
   * Render tracks when the remaining stations changed.
   * @param stations Remaining stations.
   */
  @Input() set stations(stations: number) {
    this._stations = stations;
    this._render();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._render();
  }

  /**
   * Listen window resize to re-render tracks
   */
  @HostListener('window:resize')
  onWindowResize(): void {
    this._render();
  }

  /**
   * Render the children.
   */
  private _render(): void {
    this._setTrackCountWithWindowWidth();
    this._renderTracks();
  }

  /**
   * Set the track counts according to window width
   * to prevent UI broken.
   */
  private _setTrackCountWithWindowWidth(): void {
    if (window.innerWidth < 370) {
      this._trackCount = 5;
    } else if (window.innerWidth < 455) {
      this._trackCount = 6;
    } else if (window.innerWidth < 455) {
      this._trackCount = 7;
    } else if (window.innerWidth < 500) {
      this._trackCount = 8;
    } else if (window.innerWidth < 560) {
      this._trackCount = 9;
    } else {
      this._trackCount = 10;
    }
  }

  /**
   * Render bus station and tracks.
   */
  private _renderTracks(): void {
    this.tracks = [];

    for (let i = 0; i < this._trackCount; i++) {
      const index = i + 1;

      this.tracks.push({
        index,
        isBus: index === this._stations,
      });
    }
  }
}
