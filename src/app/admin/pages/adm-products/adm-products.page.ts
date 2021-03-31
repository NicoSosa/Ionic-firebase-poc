import { Component, OnInit } from '@angular/core';
import { ADMIN_PRODUCTS_TITLE_TOOLBAR, ADMIN_URL } from '../../constants/adminPageConstants';

@Component({
  selector: 'app-adm-products',
  templateUrl: './adm-products.page.html',
  styleUrls: ['./adm-products.page.scss'],
})
export class AdmProductsPage implements OnInit {
  public tittleToolbar = ADMIN_PRODUCTS_TITLE_TOOLBAR;
  public urlBack = ADMIN_URL;

  constructor() { }

  ngOnInit() {
  }

}
