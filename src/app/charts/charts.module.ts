import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsViewComponent } from './charts-view/charts-view.component';
import { FormsModule } from '@angular/forms';
import { ChartsRoutingModule } from './charts-routing.module';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ChartsViewComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ChartsRoutingModule,
    SharedModule
  ],
  exports: [
    ChartsViewComponent
  ],
})
export class ChartsModule { }
