import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPageRoutingModule } from './view-routing.module';

import { ViewPage } from './view.page';
import { ViewInvListItemsComponent } from '../../stock/components/view-inv-list-items/view-inv-list-items.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPageRoutingModule
  ],
  declarations: [ViewPage, ViewInvListItemsComponent]
})
export class ViewPageModule {}
