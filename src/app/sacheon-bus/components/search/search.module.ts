import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './search.component';
import {InputModule} from '@tk-ui/components/input/input.module';
import {IconModule} from '@tk-ui/components/icon/icon.module';
import {FormsModule} from '@angular/forms';


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
    FormsModule
  ]
})
export class SearchModule {
}
