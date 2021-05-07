import { Component, OnInit } from '@angular/core';
import { ADMIN_STRUCT_TITLE_TOOLBAR, ADMIN_URL, INV_STRUCT_SAVE } from '../../constants/adminPageConstants';
import { DbRequestsService } from '../../../../services/db-requests.service';
import { InventoryStructure, PageInventory, CategoryInventory } from '../../../../models/inventories/inventoryStructure.model';
import { CHANGE_OPTIONS } from '../../constants/structureAdminPage';
import { ModalController } from '@ionic/angular';
import { PagesModalComponent } from '../../modals/pages-modal/pages-modal.component';
import { CategoriesModalComponent } from '../../modals/categories-modal/categories-modal.component';
import { ToastsService } from '../../../../services/userMsgs/toasts.service';

@Component({
  selector: 'app-adm-struct',
  templateUrl: './adm-struct.page.html',
  styleUrls: ['./adm-struct.page.scss'],
})
export class AdmStructPage implements OnInit {
  public tittleToolbar = ADMIN_STRUCT_TITLE_TOOLBAR;
  public urlBack = ADMIN_URL;
  private savedMsg = INV_STRUCT_SAVE;

  public changesOptions = CHANGE_OPTIONS;

  public inventoryStructure: InventoryStructure
  constructor(private modalCtrl: ModalController,
    private toastsService: ToastsService,
    private dbRequestsService: DbRequestsService) { 

  }

  ngOnInit() {
    this.dbRequestsService.getWeeklyStructure().subscribe( struct => {
      this.inventoryStructure = struct[0];
    });
  }

  segmentChanged(event): void{
    this.changesOptions.forEach( opt => opt.active = false);
    const selectedIndex = event.detail.value;
    this.changesOptions[selectedIndex].active = true;
  }


  async openPageModal(idxPage: number) {
    let pageData: PageInventory = null;
    if (idxPage >= 0) {
      pageData = this.inventoryStructure.pages[idxPage];
    } 

    const modal = await this.modalCtrl.create({
      component: PagesModalComponent,
      animated: true,
      componentProps: {
        pageData,
        idxPage
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      if( data.idxPage < 0) {
        this.inventoryStructure.pages.push(data.pageForm);
      } else {
        if(data.isDirty){
          this.inventoryStructure.pages[data.idxPage] = data.pageForm;
        }
      }
    }
  }

  async openCategoryModal(idxPage: number, idxCategory: number) {
    let categoryData: CategoryInventory = null;
    if (idxCategory >= 0) {
      categoryData = this.inventoryStructure.pages[idxPage].categories[idxCategory];
    }
    let pagesList = this.inventoryStructure.pages.map( page => page.name);
    const modal = await this.modalCtrl.create({
      component: CategoriesModalComponent,
      componentProps: {
        categoryData,
        idxPage,
        idxCategory,
        pagesList
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      if( data.idxCategory < 0) {
        this.inventoryStructure.pages[data.pageRoot].categories.push(data.categoryForm);
      } else {
        if(data.isDirty){
          if (idxPage === data.pageRoot) {
            this.inventoryStructure.pages[idxPage].categories[idxCategory].category = categoryData.category;
          } else {
            this.inventoryStructure.pages[idxPage].categories.splice(idxCategory,1)[0];
            this.inventoryStructure.pages[data.pageRoot].categories.push(data.categoryForm);
          }
        }
      }
    }

  }

  deletePage(idxPage: number) {
    this.inventoryStructure.pages.splice(idxPage,1)[0]
  }

  reorderCategories(event, idxPage) {
    let itemToMove = this.inventoryStructure.pages[idxPage].categories.splice(event.detail.from, 1)[0];
    this.inventoryStructure.pages[idxPage].categories.splice(event.detail.to, 0, itemToMove);
    event.detail.complete();
  }

  reorderPages(event) {
    let itemToMove = this.inventoryStructure.pages.splice(event.detail.from, 1)[0];
    this.inventoryStructure.pages.splice(event.detail.to, 0, itemToMove);
    event.detail.complete();
  }

  saveChanges() {
    this.dbRequestsService.updateStructure(this.inventoryStructure).then(resp => {
      this.toastsService.savedItemToast(this.savedMsg);
    }
    ).catch(err => this.toastsService.errorToast(err.msg));
  }


}
