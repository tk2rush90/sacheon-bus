import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Station} from '@sb/models/station';
import {EventListenerService} from '@tk-ui/services/common/event-listener.service';
import {EventUtil} from '@tk-ui/utils/event.util';
import {StationItemComponent} from '@sb/components/map-drawer/station-item/station-item.component';
import {Animator} from '@tk-ui/utils/animation.util';

@Component({
  selector: 'app-map-drawer',
  templateUrl: './map-drawer.component.html',
  styleUrls: ['./map-drawer.component.scss'],
  providers: [
    EventListenerService,
  ]
})
export class MapDrawerComponent implements OnInit, OnDestroy {
  // Stations that are searched in map.
  @Input() stations: Station[] = [];

  // Station selected emitter.
  @Output() stationSelected: EventEmitter<Station> = new EventEmitter<Station>();

  // Station confirmed emitter.
  @Output() stationConfirmed: EventEmitter<Station> = new EventEmitter<Station>();

  // Reference to the scrollable container.
  @ViewChild('scrollContainer') scrollContainerElementRef!: ElementRef<HTMLElement>;

  // Station items.
  @ViewChildren(StationItemComponent) stationItems!: QueryList<StationItemComponent>;

  // Drag start touch event.
  // Used to check the touch movement distance.
  private _startDragEvent?: TouchEvent;

  // The first heights of the host element when starting touch event.
  private _startingHeight = 0;

  // Scroll animator.
  private _scrollAnimator: Animator = new Animator<number>();

  // Scroll timeout timer.
  private _scrollTimer: any;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
    private eventListenerService: EventListenerService,
  ) {
  }

  // Selected station.
  private _selectedStation?: Station

  /**
   * Get selected station.
   */
  get selectedStation(): Station | undefined {
    return this._selectedStation;
  }

  /**
   * Set selected station.
   * Run scroll animation if it can.
   * @param station Selected station.
   */
  @Input() set selectedStation(station: Station | undefined) {
    this._selectedStation = station;

    clearTimeout(this._scrollTimer);

    this._scrollTimer = setTimeout(() => {
      this._scrollToSelectedStation();
    });
  }

  /**
   * Get having stations state.
   */
  get hasStations(): boolean {
    return this.stations.length > 0;
  }

  // The rendered heights of the host element by dragging handle.
  private _height?: number;

  /**
   * Get and bind rendered heights to style.
   */
  @HostBinding('style.height') get height(): string | void {
    if (this._height) {
      return `${this._height}px`;
    }
  }

  /**
   * Get host element.
   */
  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    clearTimeout(this._scrollTimer);
    this._scrollAnimator.cancel();
  }

  /**
   * Check the station is selected or not.
   * @param station Station to check.
   */
  isSelected(station: Station): boolean {
    return station.id === this.selectedStation?.id;
  }

  /**
   * When the station is first clicked, highlight it by calling `stationSelected` emitter.
   * If it's second time, update the global selected station to get arrival info list from the main.
   * @param station Selected station.
   */
  onStationClick(station: Station): void {
    if (this.isSelected(station)) {
      this.stationConfirmed.emit(station);
    } else {
      this.stationSelected.emit(station);
    }
  }

  /**
   * Initialize for the touchmove event for handle.
   * @param event Touch event.
   */
  startDrag(event: TouchEvent): void {
    this._startDragEvent = event;
    this._startingHeight = this.element.getBoundingClientRect().height;
    this._addWindowEvents();
  }

  /**
   * Listen the window resize event to unset the height for mobile.
   */
  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.innerWidth > 768) {
      this._height = undefined;
    }
  }

  /**
   * Add the touchmove and end event to handle dragging the list.
   */
  private _addWindowEvents(): void {
    this.eventListenerService.addEvent(window, 'touchmove', this._touchMoveHandler);
    this.eventListenerService.addEvent(window, 'touchend', this._touchEndHandler);
  }

  /**
   * Dragging handle to expand/collapse the list.
   * @param event Touch event.
   */
  private _touchMoveHandler = (event: TouchEvent): void => {
    if (this._startDragEvent) {
      const startingXY = EventUtil.getMouseOrTouchXY(this._startDragEvent);
      const movingXY = EventUtil.getMouseOrTouchXY(event);

      // The starting y position is lower than moving y
      // because the y-axis starts from the top.
      // So reduce from starting y to moving y.
      this._height = this._startingHeight + (startingXY.y - movingXY.y);
    }
  }

  /**
   * Clear touch feature related properties and events.
   */
  private _touchEndHandler = (): void => {
    this._startingHeight = 0;
    this._startDragEvent = undefined;
    this._removeWindowEvents();
  }

  /**
   * Remove dynamically added window events.
   */
  private _removeWindowEvents(): void {
    this.eventListenerService.removeEvent(window, 'touchmove', this._touchMoveHandler);
    this.eventListenerService.removeEvent(window, 'touchend', this._touchEndHandler);
  }

  /**
   * Scroll to the selected station with animation.
   */
  private _scrollToSelectedStation(): void {
    const station = this.stationItems.find(item => item.selected);

    if (station) {
      const scrollContainer = this.scrollContainerElementRef.nativeElement;

      this._scrollAnimator.animate({
        start: scrollContainer.scrollTop,
        target: station.element.offsetTop,
        duration: 300,
        timing: 'easeOutCirc',
        onProgress: value => scrollContainer.scrollTo(0, value),
      });
    }
  }
}
