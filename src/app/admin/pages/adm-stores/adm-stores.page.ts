import { Component, OnInit } from '@angular/core';
import { ADMIN_STORES_TITLE_TOOLBAR, ADMIN_URL } from '../../constants/adminPageConstants';

@Component({
  selector: 'app-adm-stores',
  templateUrl: './adm-stores.page.html',
  styleUrls: ['./adm-stores.page.scss'],
})
export class AdmStoresPage implements OnInit {
  public tittleToolbar = ADMIN_STORES_TITLE_TOOLBAR;
  public urlBack = ADMIN_URL;

  constructor() { }

  ngOnInit() {
  }

}
