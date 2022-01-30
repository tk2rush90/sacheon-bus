import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  // Search value
  @Input() search = '';

  // Read-only state
  @Input() readOnly = false;

  // Search change emitter
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  // Search submit emitter
  @Output() searchSubmit: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
