import { Component, OnInit } from '@angular/core';
import { ADMIN_PRODUCTS_TITLE_TOOLBAR, ADMIN_URL } from '../../constants/adminPageConstants';
import { DbRequestsService } from '../../../../services/db-requests.service';
import { ProductViewModel } from '../../../../models/products/productView.model';
import { ProductListViewModel } from '../../../../models/products/productListView.model';

@Component({
  selector: 'app-adm-products',
  templateUrl: './adm-products.page.html',
  styleUrls: ['./adm-products.page.scss'],
})
export class AdmProductsPage implements OnInit {
  public tittleToolbar = ADMIN_PRODUCTS_TITLE_TOOLBAR;
  public urlBack = ADMIN_URL;

  public productsList: ProductListViewModel[];

  constructor(private dbRequestsService: DbRequestsService) { }

  ngOnInit() {
    this.dbRequestsService.getProducts().subscribe( dataList => {
      this.productsList = dataList;
      console.log(this.productsList);
    });
  }

  toggleList(i: number): void{
    this.productsList[i].listOpen = !this.productsList[i].listOpen;
  }

  openForm(product: ProductViewModel) {
    console.log(product);
  }
}
