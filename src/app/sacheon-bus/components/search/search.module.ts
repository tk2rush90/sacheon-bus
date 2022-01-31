import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './search.component';
import {InputModule} from '@tk-ui/components/input/input.module';
import {IconModule} from '@tk-ui/components/icon/icon.module';
import {FormsModule} from '@angular/forms';
import {AutoFocusModule} from '@tk-ui/components/auto-focus/auto-focus.module';


@NgModule({
  declarations: [
    SearchComponent
  ],
  exports: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    IconModule,
    FormsModule,
    AutoFocusModule,
  ]
})
export class SearchModule {
}
