import { Component, OnInit } from '@angular/core';
import { ADMIN_ITEM_TITLE_TOOLBAR, ADMIN_URL } from '../../constants/adminPageConstants';

@Component({
  selector: 'app-adm-items',
  templateUrl: './adm-items.page.html',
  styleUrls: ['./adm-items.page.scss'],
})
export class AdmItemsPage implements OnInit {
  public tittleToolbar = ADMIN_ITEM_TITLE_TOOLBAR;
  public urlBack = ADMIN_URL;

  constructor() { }

  ngOnInit() {
  }

}
