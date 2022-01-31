import {Component, Input, OnInit} from '@angular/core';
import {Station} from '@sb/models/station';

@Component({
  selector: 'app-station-name',
  templateUrl: './station-name.component.html',
  styleUrls: ['./station-name.component.scss']
})
export class StationNameComponent implements OnInit {
  // Station data to show name and id.
  @Input() station!: Station;

  constructor() {
  }

  ngOnInit(): void {
  }

}
