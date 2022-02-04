import {Component, Input, OnInit} from '@angular/core';
import {IconDefinitions} from '@tk-ui/components/icon/icon-defs';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {
  // Icon to use.
  @Input() icon!: keyof typeof IconDefinitions;

  constructor() { }

  ngOnInit(): void {
  }

}
