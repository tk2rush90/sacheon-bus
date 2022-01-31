import {Component, ElementRef, HostBinding, Input, OnInit} from '@angular/core';
import {Station} from '@sb/models/station';

@Component({
  selector: 'app-station-item',
  templateUrl: './station-item.component.html',
  styleUrls: ['./station-item.component.scss']
})
export class StationItemComponent implements OnInit {
  // Station to display.
  @Input() station!: Station;

  // Station selected state.
  // When the station first clicked, it will be set to `true`.
  @HostBinding('class.sb-selected') @Input() selected = false;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
  ) {
  }

  /**
   * Get host element.
   */
  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngOnInit(): void {
  }

}
