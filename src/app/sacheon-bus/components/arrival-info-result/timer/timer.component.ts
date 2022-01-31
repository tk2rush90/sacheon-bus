import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  /**
   * The remaining time to arrive.
   */
  @Input() time = 0;

  constructor() {
  }

  /**
   * Bind enough class when the remaining time is over 10 minutes.
   */
  @HostBinding('class.sb-enough') get enough(): boolean {
    return this.time > 10;
  }

  /**
   * Bind close class when the remaining time is same or under 10 minutes.
   */
  @HostBinding('class.sb-close') get close(): boolean {
    return this.time <= 10;
  }

  /**
   * Bind very close class when the remaining time is same or under 5 minutes.
   */
  @HostBinding('class.sb-very-close') get veryClose(): boolean {
    return this.time <= 5;
  }

  ngOnInit(): void {
  }

}
