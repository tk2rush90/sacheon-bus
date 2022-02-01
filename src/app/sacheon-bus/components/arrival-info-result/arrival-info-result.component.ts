import {Component, Input, OnInit} from '@angular/core';
import {ArrivalInfo} from '@sb/models/arrival-info';

@Component({
  selector: 'app-arrival-info-result',
  templateUrl: './arrival-info-result.component.html',
  styleUrls: ['./arrival-info-result.component.scss']
})
export class ArrivalInfoResultComponent implements OnInit {
  // Arrival info.
  @Input() arrival!: ArrivalInfo;

  constructor() {
  }

  ngOnInit(): void {
  }
}
