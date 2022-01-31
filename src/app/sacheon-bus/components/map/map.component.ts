import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {Coordinates} from '@sb/models/coordinates';
import {Station} from '@sb/models/station';
import {ParsingUtil} from '@tk-ui/utils/parsing.util';
import {DOCUMENT} from '@angular/common';
import {IconDefinitions} from '@tk-ui/components/icon/icon-defs';

declare const kakao: any;

export interface StationOverlay {
  element: HTMLElement;
  overlay: any;
  station: Station;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  // Station selected emitter.
  @Output() stationSelected: EventEmitter<Station> = new EventEmitter<Station>();

  // Station confirmed emitter.
  @Output() stationConfirmed: EventEmitter<Station> = new EventEmitter<Station>();

  // Map coordinates change emitter.
  @Output() coordinatesChange: EventEmitter<Coordinates> = new EventEmitter<Coordinates>();

  // Bus station overlays.
  overlays: StationOverlay[] = [];

  // Map object.
  private _map: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef<HTMLElement>,
  ) {
  }

  // Searched station points.
  private _stations: Station[] = [];

  /**
   * Set searched station points.
   * @param stations Station points.
   */
  @Input() set stations(stations: Station[]) {
    this._stations = stations;
    this._createStationOverlays();
    this._highlightSelectedStation();
  }

  // Selected station.
  private _selectedStation?: Station;

  /**
   * Set selected station.
   * @param station Selected station.
   */
  @Input() set selectedStation(station: Station | undefined) {
    this._selectedStation = station;
    this._highlightSelectedStation();
  }

  /**
   * Get host element.
   */
  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._createMap();
    this._onBoundChange();
  }

  ngOnDestroy(): void {
    this._clearMap();
  }

  /**
   * Listen window resize event to relayout the map.
   */
  @HostListener('window:resize')
  onWindowResize(): void {
    this._map?.relayout();
  }

  /**
   * Create the map and events.
   */
  private _createMap(): void {
    this._map = new kakao.maps.Map(this.element, {
      center: new kakao.maps.LatLng(35.00369160597446, 128.06421168477857),
      level: 4,
    });

    this._map.setMinLevel(4);

    kakao.maps.event.addListener(this._map, 'bounds_changed', this._onBoundChange);
  }

  /**
   * When the map bound is changed, emit `coordinatesChange` emitter.
   */
  private _onBoundChange = (): void => {
    const bounds = this._map.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    this.coordinatesChange.emit({
      startLat: sw.getLat(),
      startLong: sw.getLng(),
      endLat: ne.getLat(),
      endLong: ne.getLng(),
    });
  }

  /**
   * Clear the map object and events.
   */
  private _clearMap(): void {
    this._clearOverlays();

    kakao.maps.event.removeListener(this._map, 'bounds_changed', this._onBoundChange);
  }

  /**
   * Create station overlays on map.
   */
  private _createStationOverlays(): void {
    this._clearOverlays();

    // Create new overlays.
    this.overlays = this._stations.map(item => {
      const element = this.document.createElement('div');

      element.innerHTML = IconDefinitions.bus;
      element.classList.add('sb-bus');
      element.addEventListener('click', this._onOverlayClick(item));

      const position = new kakao.maps.LatLng(ParsingUtil.toFloat(item.y), ParsingUtil.toFloat(item.x));
      const overlay = new kakao.maps.CustomOverlay({
        position,
        content: element,
      });

      overlay.setMap(this._map);

      return {
        element,
        overlay,
        station: item,
      };
    });
  }

  private _highlightSelectedStation(): void {
    if (this._selectedStation) {
      // When the `_selectedStation` exists,
      // set selected class to matching station and not selected class to
      // not matching stations to highlight the selected station.
      this.overlays.forEach(item => {
        const selected = item.station.id === this._selectedStation!.id;

        if (selected) {
          item.element.classList.add('sb-selected');
          item.element.classList.remove('sb-not-selected');
        } else {
          item.element.classList.add('sb-not-selected');
          item.element.classList.remove('sb-selected');
        }
      });
    } else {
      // When the `_selectedStation` not exists,
      // remove all selected/not selected classes from the overlays.
      this.overlays.forEach(item => {
        item.element.classList.remove('sb-selected');
        item.element.classList.remove('sb-not-selected');
      });
    }
  }

  /**
   * Handle overlay click event.
   * @param station Station.
   */
  private _onOverlayClick(station: Station): (event?: MouseEvent) => void {
    return () => {
      if (this._isSelected(station)) {
        this.stationConfirmed.emit(station);
      } else {
        this.stationSelected.emit(station);
      }
    }
  }

  /**
   * Check the station is selected or not.
   * @param station Station to check.
   */
  private _isSelected(station: Station): boolean {
    return station.id === this._selectedStation?.id;
  }

  /**
   * Clear the existing overlays
   */
  private _clearOverlays(): void {
    this.overlays.forEach(item => {
      item.overlay.setMap(null);
      item.element.remove();
    });
  }
}
