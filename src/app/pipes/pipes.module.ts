import { NgModule } from '@angular/core';
import { ItemFilterPipe } from './item-filter.pipe';

@NgModule({
  declarations: [ItemFilterPipe],
  exports: [ItemFilterPipe],
  imports: []
})
export class PipesModule { }
