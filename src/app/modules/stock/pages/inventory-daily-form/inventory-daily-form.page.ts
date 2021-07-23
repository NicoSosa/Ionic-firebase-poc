import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';

import { ViewChild } from '@angular/core';
import { IonSearchbar, IonSlides } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { DAILY_INVENTORY_TITLE_NAME, INVENTORY_SAVE_MSG, STOCK_URL } from '../../constants/inventoryConstants';
import { InventoryStructure } from '../../../../models/inventories/inventoryStructure.model';
import { ToastsService } from '../../../../services/userMsgs/toasts.service';
import { AlertsService } from '../../../../services/userMsgs/alerts.service';
import { FormStyle } from '../../../../infrastructure/enum/formStyle.enum';
import { StoreAbv, StoreName, StoresName } from 'src/app/infrastructure/enum/stores.enum';
import { InventoryFormResult } from '../../../../models/inventories/inventoryFormResult.model';
import { InventoryDailyData } from 'src/app/models/inventories/inventoryDailyData.model';
import { InventoryStructureService } from 'src/app/services/firestore-requests/inventory-structure.service';
import { InventoryReportService } from 'src/app/services/firestore-requests/inventory-report.service';
import { StoresNameDescript } from '../../../../infrastructure/enum/stores.enum';
import { ManagInventoryFormService } from '../../services/manag-inventory-form.service';
import { InventoryLocalStorageService } from '../../services/inventory-local-storage.service';
import { FormType } from 'src/app/infrastructure/enum/formType.enum';

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
  public isDaily = true;

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
    this.inventoryForm = this.miFormService.generateAndGetInventoryForm(this.inventoryStructure, this.selectedStore, FormType.Daily ,this.localStoredInventory);
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
    return this.inventoryStructureService.getLastDailyInventoryStructure(this.selectedStore)
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
    
    const dailyData = this.formatingFormResults();
    // console.log(dailyData);
    this.inventoryReportService.setNewDailyInventory(dailyData).then( resp => {
      this.deleteProgressProcess();
      this.router.navigateByUrl(this.urlBack);
      this.toastsService.savedItemToast(this.savedMsg);
    }).catch( err =>  this.toastsService.errorToast(err))
      .finally( () => this.closeLoading() );
  }

  private formatingFormResults() {
    const formResults: InventoryFormResult = this.inventoryForm.value;
    let dailyData: InventoryDailyData = {
      createdUser: '',
      closedDate: null,
      store: formResults.store,
      storeName: formResults.storeName,
      observation: '',
      isNeededCategories: [],
      isProducedCategories: [],
    };

    let othersCategory = {
      category: 'Other Items',
      items: [],
    }

    formResults.pages.forEach( (page, idxPage) => {
      if (formResults.pages.length -1 === idxPage) {
        dailyData.observation = page.observation;
      } else {
        page.categories.forEach( category => {
          switch (category.formStyle) {
            case FormStyle.IsNeededOnly:
              dailyData.isNeededCategories.push({
                category: category.category,
                items: category.items
              });
              break;
              case FormStyle.InputPlusSlider:
                dailyData.isProducedCategories.push({
                  category: category.category,
                  items: category.items.map(item => { return {
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    showName: item.showName,
                  }})
                });
              break;
              case FormStyle.IsNeededAndHide:
                category.items.forEach( item => {
                  if (item.isNeeded){
                    othersCategory.items.push({...item, category: category.category});
                  }
                });
                break;
          }
        });
        if (formResults.pages.length -2 === idxPage && othersCategory.items.length > 0) {
          dailyData.isNeededCategories.push(othersCategory);
        }
      }
    });
    return dailyData;
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
    this.pagesInv.controls.forEach( (page) => {
      const pages = page.get('categories') as FormArray;
      try {
        pages.controls.forEach( category => {
          const items = category.get('items') as FormArray;
          const formStyle = category.get('formStyle').value;
          switch (formStyle) {
            case FormStyle.InputPlusSlider:
              items.controls.forEach( item => {
                item.get('rangeQuantity').setValue(0);
                item.get('quantity').setValue(0);
              })
              break;
              case FormStyle.IsNeededOnly:
                items.controls.forEach( item => {
                  item.get('isNeeded').setValue(false);
                })
              break;
              case FormStyle.IsNeededAndHide:
                items.controls.forEach( item => {
                  item.get('isNeeded').setValue(false);
                })
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
  
  closeLoading() { this.alertsService.dismissLoading();}
}
