import {Component, HostBinding, Input, OnInit} from '@angular/core';

export type TextType =
  'default'
  | 'grey-text'
  | 'next-destination'
  | 'sub-title'
  | 'default-white'
  | 'line-number';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  // Set text type
  @Input() type!: TextType;

  constructor() {
  }

  /**
   * Bind default text class
   */
  @HostBinding('class.sb-default') get default(): boolean {
    return this.type === 'default';
  }

  /**
   * Bind grey text class
   */
  @HostBinding('class.sb-grey-text') get subText(): boolean {
    return this.type === 'grey-text';
  }

  /**
   * Bind next destination class
   */
  @HostBinding('class.sb-next-destination') get nextDestination(): boolean {
    return this.type === 'next-destination';
  }

  /**
   * Bind subtitle class
   */
  @HostBinding('class.sb-sub-title') get subTitle(): boolean {
    return this.type === 'sub-title';
  }

  /**
   * Bind default white class
   */
  @HostBinding('class.sb-default-white') get defaultWhite(): boolean {
    return this.type === 'default-white';
  }

  /**
   * Bind line number class
   */
  @HostBinding('class.sb-line-number') get lineNumber(): boolean {
    return this.type === 'line-number';
  }

  ngOnInit(): void {
  }

}
