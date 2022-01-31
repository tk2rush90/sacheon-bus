import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {IconModule} from '@tk-ui/components/icon/icon.module';
import {TextModule} from '@sb/components/text/text.module';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    TextModule
  ]
})
export class HeaderModule {
}
