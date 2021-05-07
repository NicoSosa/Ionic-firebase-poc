import { Component, OnInit } from '@angular/core';
import { ADMIN_ITEM_TITLE_TOOLBAR, ADMIN_URL, INV_STRUCT_SAVE } from '../../constants/adminPageConstants';
import { DbRequestsService } from '../../../../services/db-requests.service';
import { InventoryStructure } from '../../../../models/inventories/inventoryStructure.model';
import { ItemOfAdministration } from '../../../../models/administration/itemOfAdministration.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ItemModalComponent } from '../../modals/item-modal/item-modal.component';
import { ToastsService } from 'src/app/services/userMsgs/toasts.service';
import { AlertsService } from '../../../../services/userMsgs/alerts.service';

@Component({
  selector: 'app-adm-items',
  templateUrl: './adm-items.page.html',
  styleUrls: ['./adm-items.page.scss'],
})
export class AdmItemsPage implements OnInit {
  public tittleToolbar = ADMIN_ITEM_TITLE_TOOLBAR;
  public urlBack = ADMIN_URL;
  private savedMsg = INV_STRUCT_SAVE;

  public inventoryStructure: InventoryStructure;
  public itemList: ItemOfAdministration[] = [];
  public filteredItemList: ItemOfAdministration[] = [];
  private filterParams;
  filterForm: FormGroup;

  constructor(private modalCtrl: ModalController,
    private alertsService: AlertsService,
    private formBuilder: FormBuilder,
    private toastsService: ToastsService,
    private dbRequestsService: DbRequestsService) { }

  ngOnInit() {
    this.generateFilterForm();
    this.getData();
    this.createListeners();
  }

  private getData(): void {
    this.dbRequestsService.getWeeklyStructure().subscribe( struct => {
      this.inventoryStructure = struct[0];
      this.setItemList();
      this.filterItems();
    });
  }

  private setItemList() {
    this.itemList = [];
    this.filteredItemList = [];
    this.inventoryStructure.pages.forEach( (page, idxPage) => {
      page.categories.forEach( (category, idxCategory) => {
        category.items.forEach( item => {
          this.itemList.push({...item,idxPage,idxCategory});
          this.filteredItemList.push({...item,idxPage,idxCategory});
        });
      });
    })
  }

  private generateFilterForm(): void {
    this.filterParams = { keyWord: '', filterPage: -1, filterCategory: -1}
    this.filterForm = this.formBuilder.group({
      keyWord: '',
      filterPage: -1,
      filterCategory: -1
    });
  }

  private createListeners(): void {
    this.filterForm.valueChanges.subscribe( form => {
      this.filterParams = form;
      this.filterItems();
    })
  }

  get filterPage(): FormControl {
    return this.filterForm.get('filterPage') as FormControl;
  }

  get filterCategory(): FormControl {
    return this.filterForm.get('filterCategory') as FormControl;
  }

  public filterPageChange(): void {
    this.filterCategory.setValue(-1);
  }


  private filterItems(): void {
    let params = this.filterParams;
    let items = this.itemList.filter( item => {
      const searchPage = params.filterPage;
      const searchCategory = params.filterCategory;
      if ( searchPage === -1 ) {
        return item;
      }

      if ( searchCategory === -1 && item.idxPage === searchPage) {
        return item;
      }

      if ( searchCategory === item.idxCategory && item.idxPage === searchPage) {
        return item
      }
    });
    
    const itemSearched: ItemOfAdministration[] = [];
    for (const it of items){
      let searchWord = params.keyWord.toLowerCase();
      const nameLC = it.name.toLowerCase();
      const showNameLC = it.showName.toLowerCase();
      if ( nameLC.indexOf(searchWord) >= 0 || showNameLC.indexOf(searchWord) >= 0 ) {
        itemSearched.push(it);
      }
    }
    this.filteredItemList = itemSearched;
  }

  async openItemModal(item){
    let itemData: ItemOfAdministration = null;
    let idxItem: number = -1;
    if (item) {
      idxItem = this.inventoryStructure.pages[item.idxPage].categories[item.idxCategory].items.findIndex( itm => itm.id.localeCompare( item.id) === 0 );
      itemData = item;
    }
    const modal = await this.modalCtrl.create({
      component: ItemModalComponent,
      componentProps: {
        itemData,
        inventoryStructure: this.inventoryStructure
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    this.beforeCloseModal(item, idxItem, data);
  }

  private beforeCloseModal( item, idxItem, data ) {
    this.alertsService.presentLoading();
    if (data && data.isDirty) {
      const idCat = data.itemForm.idxCategory;
      const idPag = data.itemForm.idxPage;
      const dataItem = {
        id: data.itemForm.id,
        name: data.itemForm.name,
        slid: data.itemForm.slid,
        showName: data.itemForm.showName,
        unit: data.itemForm.unit
      }

      if( data.isNew) {
        this.inventoryStructure.pages[idPag].categories[idCat].items.push(dataItem);
      } else {
        if (data.delete) {
          
          let items = this.inventoryStructure.pages[item.idxPage]
            .categories[item.idxCategory].items.filter((itm,idx) => idx!==idxItem);
          this.inventoryStructure.pages[item.idxPage].categories[item.idxCategory].items = items;
        } else {
          if ( idCat !== item.idxCategory || idPag !== item.idxPage ) {
            let items = this.inventoryStructure.pages[item.idxPage]
            .categories[item.idxCategory].items.filter((itm,idx) => idx!==idxItem);
            this.inventoryStructure.pages[item.idxPage].categories[item.idxCategory].items = items;
            this.inventoryStructure.pages[idPag].categories[idCat].items.push(dataItem);
          } else {
            this.inventoryStructure.pages[item.idxPage].categories[item.idxCategory].items[idxItem] = {
              id: dataItem.id,
              name: dataItem.name,
              slid: dataItem.slid,
              showName: dataItem.showName,
              unit: dataItem.unit
            }
          }
        }
      }
      this.dbRequestsService.updateWeekStructure(this.inventoryStructure).then(resp => {
        this.toastsService.savedItemToast(this.savedMsg);
      }
      ).catch(err => this.toastsService.errorToast(err.msg))
      .finally( () => this.alertsService.dismissLoading() );
      // this.setItemList();
      // this.filterItems();
    }

  }
  
}
