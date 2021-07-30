import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';

import { ViewChild } from '@angular/core';
import { IonSearchbar, IonSlides } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { INVENTORY_SAVE_MSG, STOCK_URL, WEEK_INVENTORY_TITLE_NAME } from '../../constants/inventoryConstants';
import { InventoryStructure, PageInventory } from '../../../../models/inventories/inventoryStructure.model';
import { ToastsService } from '../../../../services/userMsgs/toasts.service';
import { AlertsService } from '../../../../services/userMsgs/alerts.service';
import { FormStyle } from '../../../../infrastructure/enum/formStyle.enum';
import { StoreAbv, StoreName, StoresName, StoresNameDescript } from 'src/app/infrastructure/enum/stores.enum';
import { InventoryStructureService } from 'src/app/services/firestore-requests/inventory-structure.service';
import { InventoryReportService } from 'src/app/services/firestore-requests/inventory-report.service';
import { InventoryFormResult } from 'src/app/models/inventories/inventoryFormResult.model';
import { InventoryWeeklyData } from 'src/app/models/inventories/inventoryWeeklyData.model';
import { CategoryWeeklyData } from '../../../../models/inventories/inventoryWeeklyData.model';
import { ManagInventoryFormService } from '../../services/manag-inventory-form.service';
import { InventoryLocalStorageService } from '../../services/inventory-local-storage.service';
import { FormType } from '../../../../infrastructure/enum/formType.enum';


const INVENTORY_LS ='inventoryLocalStorage'

@Component({
  selector: 'app-inventory-weekly-form',
  templateUrl: './inventory-weekly-form.page.html',
  styleUrls: ['./inventory-weekly-form.page.scss'],
})
export class InventoryWeeklyFormPage implements OnInit {
  private invTitleName = WEEK_INVENTORY_TITLE_NAME;
  public urlBack = STOCK_URL;
  private savedMsg = INVENTORY_SAVE_MSG;
  public tittleToolbar: string;
  public localStoredInventory: any;
  public nameOfLocalStorageStore: string;
  public inventoryStructure: InventoryStructure;
  public inventoryForm: FormGroup;
  public filterWord: string = '';

  public storeList = StoresName;
  private selectedStore: StoresName;
  private storeAbv: StoreAbv;
  private storeName: StoreName;
  public slidePosition: number = 0;
  
  public formStyleEnum = FormStyle;

  @ViewChild('slides') slides: IonSlides;
  @ViewChild('searchBar') searchBar: IonSearchbar;
  public slidesButtonStatus: any[] = [ {active: false,text: '', lastPage: false}, {active: false, text: '', lastPage: false}];


  constructor(private router: Router,
    private actRoute: ActivatedRoute,
    private toastsService: ToastsService,
    private alertsService: AlertsService,
    private miFormService: ManagInventoryFormService,
    private inventoryLSService: InventoryLocalStorageService,
    private inventoryStructureService: InventoryStructureService,
    private inventoryReportService: InventoryReportService) { }

  ngOnInit() {
    this.initialProccess();
  }

  private async initialProccess(): Promise<void> {
    this.alertsService.presentLoading().then();
    await this.getStoreByActivatedRouteAsync();
    await this.getInventoryStructureAsync();
    this.setTittleAndSlideButtonsNames();
    this.localStoredInventory = this.inventoryLSService.getLocalStorageInventory(this.nameOfLocalStorageStore);
    this.inventoryForm = this.miFormService.generateAndGetInventoryForm(this.inventoryStructure, this.selectedStore, FormType.Weekly ,this.localStoredInventory);
    this.closeLoading();  
  }

  private async getStoreByActivatedRouteAsync(): Promise<void> {
    return this.actRoute.params.pipe(first()).toPromise().then( params => {
      this.nameOfLocalStorageStore = params.id+INVENTORY_LS;
      this.storeAbv = params.id;
      this.selectedStore = StoresName[this.storeAbv];
      this.storeName = StoresNameDescript.get(this.selectedStore);
    });
  }

  private async getInventoryStructureAsync(): Promise<void> {
    return this.inventoryStructureService.getLastWeeklyInventoryStructure(this.selectedStore)
        .pipe(first()).toPromise().then( struct => {
          if (!this.inventoryStructure) {
            this.inventoryStructure = struct
          }
    });
  }

  private setTittleAndSlideButtonsNames(): void {
    this.tittleToolbar = `${this.invTitleName} - ${this.inventoryStructure.pages[0].name}`;
    this.slidesButtonStatus[0] = { active: false, text: '', lastPage: false }
      this.slidesButtonStatus[1] = { active: true, text: this.inventoryStructure.pages[1].name, lastPage: false}
  }

  //#region - Forms Logic


  get pagesInv(): FormArray {
    return this.inventoryForm.get('pages') as FormArray;
  }

  get storeInv(): FormControl {
    return this.inventoryForm.get('store') as FormControl;
  }
  get storeNameInv(): FormControl {
    return this.inventoryForm.get('storeName') as FormControl;
  }

  public saveInventory(): void {
    this.saveInventoryProcess();
    // this.alertsService.warningSaveData().then( alert => {
    //   alert.present();
    //   alert.onDidDismiss().then( value => {
    //     if (value.role === 'ok') {
    //       this.saveInventoryProcess();
    //     }
    //   })
    // })
  }

  private saveInventoryProcess(): void {
    this.alertsService.presentLoading().then();

    const weeklyData = this.formatingFormResults();
    // console.log(weeklyData);
    this.inventoryReportService.setNewWeeklyInventory(weeklyData).then( resp => {
      this.deleteProgressProcess();
      this.router.navigateByUrl(this.urlBack);
      this.toastsService.savedItemToast(this.savedMsg);
    }).catch( err => 
      { console.log(err);
        this.toastsService.errorToast(err.msg)})
      .finally( () => this.closeLoading());
  }
  
  private formatingFormResults() {
    const formResults: InventoryFormResult = this.inventoryForm.value;
    let weeklyData: InventoryWeeklyData = {
      createdUser: '',
      closedDate: null,
      store: formResults.store,
      storeName: formResults.storeName,
      observation: '',
      weeklyReport: [],     
    };

    let othersCategory = {
      category: 'Other Items',
      items: [],
    }

    formResults.pages.forEach( (page, idxPage) => {
      if (formResults.pages.length -1 === idxPage) {
        weeklyData.observation = page.observation;
      } else {
        page.categories.forEach( categoryData => {
          let categoryWeeklyData: CategoryWeeklyData = {
            category: categoryData.category,
            items: categoryData.items.map(item => { return {
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              showName: item.showName,
              unit: item.unit,
            }})
          }
          weeklyData.weeklyReport.push(categoryWeeklyData);
        });
      }
    });
    return weeklyData;

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
    this.slides.slideTo(0).then(() => {
      this.slides.getActiveIndex().then( activeIdx => {
        this.updateSlideButton(activeIdx);
      })
    });
    this.pagesInv.controls.forEach( page => {
      const pages = page.get('categories') as FormArray;
      try {
        pages.controls.forEach( category => {
          let style = category.get('formStyle').value;
          const items = category.get('items') as FormArray;
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
        })
      } catch (error) {
        
      }
    });
    this.inventoryForm.get('createdDate').reset;
    this.inventoryLSService.deleteLocalStorageInventory(this.nameOfLocalStorageStore);
  }
  //#endregion

  //#region LocalStorage
  public setLocalStorageInventory(): any {
    this.inventoryLSService.setLocalStorageInventory(this.inventoryForm, this.nameOfLocalStorageStore);
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
    this.filterWord = '';
    this.searchBar.getInputElement().then( inputValue =>{
      inputValue.value = '';
    });
    this.slidePosition = idx;
  }
  //#endregion

  public filterItems(event) {
    this.filterWord = event.detail.value;
  }

  closeLoading(): void { 
    this.alertsService.dismissLoading().then()}
}
