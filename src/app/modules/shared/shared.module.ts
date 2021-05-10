import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';
import { FormToolbarComponent } from './components/form-toolbar/form-toolbar.component';


@NgModule({
  declarations: [
    ToolbarComponent,
    FormToolbarComponent,
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    ToolbarComponent,
    FormToolbarComponent,
  ]
})
export class SharedModule { }
