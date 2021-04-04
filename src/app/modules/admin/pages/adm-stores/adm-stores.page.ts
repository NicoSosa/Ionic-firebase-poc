import { Component, OnInit } from '@angular/core';
import { ADMIN_STORES_TITLE_TOOLBAR, ADMIN_URL } from '../../constants/adminPageConstants';
import { DbRequestsService } from '../../../../services/db-requests.service';
import { StoreViewModel } from '../../../../models/stores/storeView.model';

@Component({
  selector: 'app-adm-stores',
  templateUrl: './adm-stores.page.html',
  styleUrls: ['./adm-stores.page.scss'],
})
export class AdmStoresPage implements OnInit {
  public tittleToolbar = ADMIN_STORES_TITLE_TOOLBAR;
  public urlBack = ADMIN_URL;

  public storesList: StoreViewModel[];

  constructor(private dbRequestsService: DbRequestsService) { }

  ngOnInit() {
    this.dbRequestsService.getStores().subscribe( dataList => {
      this.storesList = dataList;
    });
  }

  openForm(store: StoreViewModel){
    console.log(store);
  }

}
