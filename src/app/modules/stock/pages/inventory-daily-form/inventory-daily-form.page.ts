import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DbRequestsService } from '../../../../services/db-requests.service';
import { DAILY_INVENTORY_TITLE_NAME, INVENTORY_SAVE_MSG, STOCK_URL } from '../../constants/inventoryConstants';
import { InventoryStructure, PageInventory } from '../../../../models/inventories/inventoryStructure.model';
import { StoreViewModel } from '../../../../models/stores/storeView.model';
import { ToastsService } from '../../../../services/userMsgs/toasts.service';
import { AlertsService } from '../../../../services/userMsgs/alerts.service';
import { FormStyle } from '../../../../infrastructure/enum/formStyle.enum';

const INVENTORY_LS ='dailyInventoryLocalStorage'
@Component({
  selector: 'app-inventory-daily-form',
  templateUrl: './inventory-daily-form.page.html',
  styleUrls: ['./inventory-daily-form.page.scss'],
})
export class InventoryDailyFormPage implements OnInit {
  private invTitleName = DAILY_INVENTORY_TITLE_NAME;
  public urlBack = STOCK_URL;
  private savedMsg = INVENTORY_SAVE_MSG;
  public tittleToolbar: string;
  public cacheInventory: any;
  public inventoryStructure: InventoryStructure;
  public storeList: StoreViewModel[];
  private selectedStore: StoreViewModel;
  public formStyleEnum = FormStyle;

  @ViewChild('slides') slides: IonSlides;
  public slidesButtonStatus: any[] = [ {active: false,text: '', lastPage: false}, {active: false, text: '', lastPage: false}];

  inventoryForm: FormGroup;

  constructor(private router: Router,
    private actRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastsService: ToastsService,
    private alertsService: AlertsService,
    private dbRequestsService: DbRequestsService) { }

  ngOnInit() {
    this.alertsService.presentLoading().then();
    this.cacheInventory = this.getLocalStorageInventory();
    this.generateInventoryForm();
    this.getInventoryStruct();
    this.getStore();
  }

  //#region - Get Data
  private getInventoryStruct() {
    this.dbRequestsService.getDailyStructure().subscribe( struct => {
      this.inventoryStructure = struct;
      this.tittleToolbar = `${this.invTitleName} - ${struct.pages[0].name}`;
      this.slidesButtonStatus[0] = { active: false, text: '', lastPage: false }
        this.slidesButtonStatus[1] = { active: true, text: struct.pages[1].name, lastPage: false}
      struct.pages.forEach( (page, pageIdx) => this.pushPageInv(page, pageIdx) )
      this.pushFinalPage();
      this.alertsService.dismissLoading();
    });
  }

  private getStore(): void {
    this.actRoute.params.subscribe( params => {
      this.storeInv.setValue(params.id);
    });

    this.dbRequestsService.getStores().subscribe( stores => {
      this.storeList = stores;
      const storeAbv = this.storeInv.value;
      this.selectedStore = this.storeList.filter( store => store.nameAbbreviation === storeAbv)[0];
      this.invTitleName = ` ${this.selectedStore.name}: ${this.invTitleName}`;
      
      this.tittleToolbar = `${this.invTitleName} - ${this.inventoryStructure? this.inventoryStructure.pages[0].name : ''}`;
    }
    );
  }
  //#endregion

  //#region - Forms Logic
  private generateInventoryForm(): void {
    this.inventoryForm = this.formBuilder.group({
      store: '',
      pages: this.formBuilder.array([]),
      createdDate: '',
    });
  }

  get pagesInv(): FormArray {
    return this.inventoryForm.get('pages') as FormArray;
  }

  get storeInv(): FormControl {
    return this.inventoryForm.get('store') as FormControl;
  }

  private pushFinalPage(): void {
    this.pagesInv.push(
      this.formBuilder.group({
        name: 'Final page',
        observation: '',
      })
    );
  }

  private pushPageInv(pageInventory: PageInventory, pageIdx: number): void {
    this.pagesInv.push(
      this.formBuilder.group({
        name: pageInventory.name,
        categories: this.formBuilder.array([]),
      })
    );
  }

  public saveInventory(): void {
    this.alertsService.warningSaveData().then( alert => {
      alert.present();
      alert.onDidDismiss().then( value => {
        if (value.role === 'ok') {
          this.saveInventoryProcess();
        }
      })
    })
  }

  private saveInventoryProcess(): void {
    this.alertsService.presentLoading().then();
    this.storeInv.setValue(this.selectedStore.nameAbbreviation);
    this.dbRequestsService.setNewDailyInventory(this.inventoryForm.value).then( resp => {
      this.deleteProgressProcess();
      this.router.navigateByUrl(this.urlBack);
      this.toastsService.savedItemToast(this.savedMsg);
    }).catch( err =>  this.toastsService.errorToast(err))
      .finally( () => this.alertsService.dismissLoading() );
  }

  public deleteProgress(): void {
    this.alertsService.warningDelete().then( alert => {
      alert.present();
      alert.onDidDismiss().then(value => {
        if( value.role === 'ok') {
          this.deleteProgressProcess();
        }
      })
    })
  }
  
  private deleteProgressProcess(): void {
    this.pagesInv.controls.forEach( (page, idxPage) => {
      const pages = page.get('categories') as FormArray;
      let isOthr = null;
      if (this.inventoryStructure.pages[idxPage]){
        isOthr =  this.inventoryStructure.pages[idxPage].itsOther;
      }
      try {
        pages.controls.forEach( category => {
          let style = category.get('formStyle').value;
          const items = category.get('items') as FormArray;
          if(!isOthr){
            switch (style) {
              case FormStyle.InputPlusSlider:
                items.controls.forEach( item => {
                  item.get('quantity').setValue(0);
                  item.get('rangeQuantity').setValue(0);
                })
                break;
              case FormStyle.OnlyInput:
                items.controls.forEach( item => {
                  item.get('quantity').setValue(0);
                })
                break;
              case FormStyle.IsNeededInput:
                items.controls.forEach( item => {
                  item.get('quantity').setValue(0);
                  item.get('isNeeded').setValue(false);
                })
                break;
              default:
                break;
            }
          } else {
            items.controls.forEach( item => {
              item.get('quantity').setValue(0);
              item.get('isNeeded').setValue(false);
            })
          }
        })
      } catch (error) {
        
      }
    });
    this.inventoryForm.get('createdDate').reset;
    this.deleteLocalStorageInventory();
  }
  //#endregion

  //#region LocalStorage
  public setLocalStorageInventory(): any {
    this.inventoryForm.get('createdDate').setValue(Date.now());
    localStorage.setItem(INVENTORY_LS, JSON.stringify(this.inventoryForm.value))
  }

  private getLocalStorageInventory(): any {
    const inventoryLS = JSON.parse(localStorage.getItem(INVENTORY_LS));
    let dateControl= Date.now();
    if ( inventoryLS && inventoryLS.createdDate +  1000*60*60 >= dateControl) {
      return inventoryLS;
    } else {
      return null;
    }
  }

  private deleteLocalStorageInventory() {
    localStorage.removeItem(INVENTORY_LS);
  }
  //#endregion

  //#region Button Slides
  next() {
    this.slides.slideNext().then( () => {
      this.slides.getActiveIndex().then( activeIdx => {
        this.updateSlideButton(activeIdx);
      })
    });
  }

  prev() {
    this.slides.slidePrev().then( () => {
      this.slides.getActiveIndex().then( activeIdx => {
        this.updateSlideButton(activeIdx);
      })
    });
  }

  updateSlideButton(idx: number) {
    if(this.inventoryStructure.pages[idx]){
      this.tittleToolbar = `${this.invTitleName} - ${this.inventoryStructure.pages[idx].name}`;
    } else {
      this.tittleToolbar = `${this.invTitleName}`;
    }
    switch (idx) {
      case 0:
        this.slidesButtonStatus[0] = { active: false, text: '', lastPage: false }
        this.slidesButtonStatus[1] = { active: true, text: this.pagesInv.controls[idx+1].get('name').value, lastPage: false }
        break;
      case this.pagesInv.length - 1:
        this.slidesButtonStatus[0] = { active: true, text: this.pagesInv.controls[idx-1].get('name').value, lastPage: true }
        this.slidesButtonStatus[1] = { active: false, text: '', lastPage: true }
        break;
      default:
        this.slidesButtonStatus[0] = { active: true, text: this.pagesInv.controls[idx-1].get('name').value, lastPage: false }
        this.slidesButtonStatus[1] = { active: true, text: this.pagesInv.controls[idx+1].get('name').value, lastPage: false }
        break;
    }
  }
  //#endregion
}
