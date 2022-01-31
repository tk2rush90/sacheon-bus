import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  // Spinner color transition list.
  colors: string[] = [
    '#E43C00',
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
