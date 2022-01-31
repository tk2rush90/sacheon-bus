import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from './loading.component';
import {LoadingSpinnerModule} from '@tk-ui/components/loading-spinner/loading-spinner.module';


@NgModule({
  declarations: [
    LoadingComponent
  ],
  exports: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    LoadingSpinnerModule
  ]
})
export class LoadingModule {
}
