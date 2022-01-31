import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  // Search value.
  @Input() search?: string = '';

  // Read-only state.
  @Input() readOnly = false;

  // Search change emitter.
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  // Timeout timer.
  private _timer: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    clearTimeout(this._timer);
  }

  /**
   * Emit the `searchChange` emitter after 500ms.
   * @param search changed search
   */
  onSearchChange(search: string): void {
    clearTimeout(this._timer);

    if (search) {
      this._timer = setTimeout(() => {
        this.searchChange.emit(search);
      }, 500);
    } else {
      // Emit immediately when search is empty.
      this.searchChange.emit(search);
    }
  }

  /**
   * Emit the changed value when enter pressed from input element.
   * @param event event
   */
  onInputEnter(event: Event): void {
    clearTimeout(this._timer);

    this.searchChange.emit((event.target as HTMLInputElement).value);
  }
}
