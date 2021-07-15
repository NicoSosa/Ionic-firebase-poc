import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ADMIN_STRUCT_TITLE_TOOLBAR, ADMIN_URL, INV_STRUCT_SAVE } from '../../constants/adminPageConstants';
import { InventoryStructure, PageInventory, CategoryInventory } from '../../../../models/inventories/inventoryStructure.model';
import { CHANGE_OPTIONS } from '../../constants/structureAdminPage';
import { ModalController } from '@ionic/angular';
import { PagesModalComponent } from '../../modals/pages-modal/pages-modal.component';
import { CategoriesModalComponent } from '../../modals/categories-modal/categories-modal.component';
import { ToastsService } from '../../../../services/userMsgs/toasts.service';
import { AlertsService } from '../../../../services/userMsgs/alerts.service';
import { FormType, FormTypeDescript } from '../../../../infrastructure/enum/formType.enum';
import { ActivatedRoute } from '@angular/router';
import { InventoryStructureService } from '../../../../services/firestore-requests/inventory-structure.service';
import { FormStyleDescript } from 'src/app/infrastructure/enum/formStyle.enum';

@Component({
  selector: 'app-adm-struct',
  templateUrl: './adm-struct.page.html',
  styleUrls: ['./adm-struct.page.scss'],
})
export class AdmStructPage implements OnInit {
  public tittleToolbar: string = '';
  public urlBack = ADMIN_URL;
  private savedMsg = INV_STRUCT_SAVE;

  public changesOptions = CHANGE_OPTIONS;

  public inventoryStructure: InventoryStructure;
  public formStyleDescript = FormStyleDescript;
  private formType: FormType;
  private formTypeDescript = FormTypeDescript;

  constructor(private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private alertsService: AlertsService,
    private toastsService: ToastsService,
    private inventoryStructureService: InventoryStructureService) { 

  }

  ngOnInit() {
    this.initialProccess();
  }

  private async initialProccess(): Promise<void> {
    this.alertsService.presentLoading();
    this.formType = await this.activatedRoute.params.pipe(first()).toPromise().then(params => {
      if (params.id === 'weekly') {
        return FormType.Weekly
      }
      if (params.id === 'daily') {
        return FormType.Daily
      }
      return null;
    });

    this.tittleToolbar = `${this.formTypeDescript.get(this.formType)} ${ADMIN_STRUCT_TITLE_TOOLBAR}`;

    if (this.formType === FormType.Weekly) {
      this.inventoryStructureService.getWeeklyStructure().subscribe( struct => {
        this.inventoryStructure = struct;
        this.alertsService.dismissLoading()
      });
    }

    if (this.formType === FormType.Daily) {
      this.inventoryStructureService.getDailyStructure().subscribe( struct => {
        this.inventoryStructure = struct;
        this.alertsService.dismissLoading()
      });
    }

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

    this.alertsService.presentLoading();
    if (this.formType === FormType.Weekly) {
      this.inventoryStructureService.updateWeekStructure(this.inventoryStructure).then(resp => {
        this.toastsService.savedItemToast(this.savedMsg);
      }
      ).catch(err => {
        this.toastsService.errorToast(err.msg)
        console.log(err);
      }).finally( () => this.alertsService.dismissLoading() );
    }
    if (this.formType === FormType.Daily) {
      this.inventoryStructureService.updateDailyStructure(this.inventoryStructure).then(resp => {
        this.toastsService.savedItemToast(this.savedMsg);
      }).catch(err => {
        this.toastsService.errorToast(err.msg)
        console.log(err);
      }).finally( () => this.alertsService.dismissLoading() );
    }

  }


}
