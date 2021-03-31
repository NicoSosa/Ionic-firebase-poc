import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class SharedModule { }
