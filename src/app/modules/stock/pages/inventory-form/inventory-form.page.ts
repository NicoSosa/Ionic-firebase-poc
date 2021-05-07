import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DbRequestsService } from '../../../../services/db-requests.service';
import { INVENTORY_SAVE_MSG, STOCK_URL, WEEK_INVENTORY_TITLE_NAME } from '../../constants/inventoryConstants';
import { InventoryStructure, PageInventory, CategoryInventory, ItemInventory } from '../../../../models/inventories/inventoryStructure.model';
import { StoreViewModel } from '../../../../models/stores/storeView.model';
import { ToastsService } from '../../../../services/userMsgs/toasts.service';
import { AlertsService } from '../../../../services/userMsgs/alerts.service';
import { FormStyle } from '../../../../infrastructure/enum/formStyle.enum';

const INVENTORY_LS ='inventoryLocalStorage'

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.page.html',
  styleUrls: ['./inventory-form.page.scss'],
})
export class InventoryFormPage implements OnInit {
  public tittleToolbar = WEEK_INVENTORY_TITLE_NAME;
  public urlBack = STOCK_URL;
  private savedMsg = INVENTORY_SAVE_MSG;
  public cacheInventory: any;
  public storeList: StoreViewModel[];
  private selectedStore: StoreViewModel;
  public formSytleEnum = FormStyle;

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
    
    //ToDo: get List of items and charge it to Stock Form
  }

  segmentChanged(event): void{
    const selectedIndex = event.detail.value;
    this.selectedStore = this.storeList[selectedIndex];
  }

  //#region - Get Data
  private getInventoryStruct() {
    this.dbRequestsService.getWeeklyStructure().subscribe( struct => {
      this.slidesButtonStatus[0] = { active: false, text: '', lastPage: false }
        this.slidesButtonStatus[1] = { active: true, text: struct[0].pages[1].name, lastPage: false}
      struct[0].pages.forEach( (page, pageIdx) => this.pushPageInv(page, pageIdx) )
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
      this.tittleToolbar = this.tittleToolbar + ` - ${this.selectedStore.name}`
    }
    );
  }
  //#endregion

  //#region - Forms Logic
  private generateInventoryForm(): void {
    this.inventoryForm = this.formBuilder.group({
      store: '',
      pages: this.formBuilder.array([]),
      date: '',
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
    const pagePosition = this.pagesInv.length - 1;
    const categoryControl = this.pagesInv.controls[pagePosition].get('categories');
    pageInventory.categories.forEach( (category, categoryIdx) => this.pushPageCategory(categoryControl, category, pageIdx, categoryIdx))
  }

  private pushPageCategory(categoryArrayControl, categoryInventory: CategoryInventory, pageIdx: number, categoryIdx: number ): void {
    categoryArrayControl.push(this.formBuilder.group({
      category: categoryInventory.category,
      unit: categoryInventory.unit,
      formSytle: categoryInventory.formStyle,
      items: this.formBuilder.array([]),
    }));
    const categoryPosition = categoryArrayControl.length -1;
    const itemControl = categoryArrayControl.controls[categoryPosition].get('items');
    switch (categoryInventory.formStyle) {
      case FormStyle.InputPlusSlider:
        categoryInventory.items.forEach( (item, itemIdx) => this.pushCategoryItem(itemControl, item, pageIdx, categoryIdx, itemIdx));
        break;
      case FormStyle.OnlyInput:
        categoryInventory.items.forEach( (item, itemIdx) => this.pushCategoryOnlyInputItem(itemControl, item, pageIdx, categoryIdx, itemIdx));
        break;
      case FormStyle.IsNeededInput:
        categoryInventory.items.forEach( (item, itemIdx) => this.pushCategoryNeededItem(itemControl, item, pageIdx, categoryIdx, itemIdx));
        break;
      default:
        break;
    }

  }

  private pushCategoryItem(itemArrayControl, item: ItemInventory, pageIdx: number, categoryIdx: number, itemIdx: number): void {
    let quant = 0;
    if(this.cacheInventory){ quant = this.getQuantityFromCache(pageIdx, categoryIdx, itemIdx);}
    itemArrayControl.push( this.formBuilder.group({
      id: item.id,
      name: item.name,
      showName: item.showName,
      slid: item.slid,
      quantity: quant,
      rangeQuantity: quant,
    }));
  }

  private pushCategoryOnlyInputItem(itemArrayControl, item: ItemInventory, pageIdx: number, categoryIdx: number, itemIdx: number): void {
    let quant = 0;
    if(this.cacheInventory){ quant = this.getQuantityFromCache(pageIdx, categoryIdx, itemIdx);}
    itemArrayControl.push( this.formBuilder.group({
      id: item.id,
      name: item.name,
      showName: item.showName,
      unit: item.unit,
      quantity: quant,
    }));
  }

  private pushCategoryNeededItem(itemArrayControl, item: ItemInventory, pageIdx: number, categoryIdx: number, itemIdx: number): void {
    let quant = 0;
    let isNeed = false;
    if(this.cacheInventory){ 
      quant = this.getQuantityFromCache(pageIdx, categoryIdx, itemIdx);
      isNeed = this.getIsNeededFromCache(pageIdx, categoryIdx, itemIdx);
    };

    itemArrayControl.push( this.formBuilder.group({
      id: item.id,
      name: item.name,
      showName: item.showName,
      unit: item.unit,
      quantity: {value: quant | 0, disabled: !isNeed},
      isNeeded: isNeed,
    }));
  }

  public inputChange(idxPage, idxCategory, idxControl): void {
    const itemControl = this.getItemControl(idxPage, idxCategory, idxControl);
    const inputValue = itemControl.get('quantity').value;
    itemControl.get('rangeQuantity').setValue(inputValue);

    this.setLocalStorageInventory();
  }

  public rangeChange(idxPage, idxCategory, idxControl): void {
    const itemControl = this.getItemControl(idxPage, idxCategory, idxControl);
    const rangeValue = itemControl.get('rangeQuantity').value;
    itemControl.get('quantity').setValue(rangeValue);
    
    this.setLocalStorageInventory();
  }

  public changeCheckNeeded(idxPage, idxCategory, idxControl): void {
    const itemControl = this.getItemControl(idxPage, idxCategory, idxControl);
    const isNeeded: boolean = !itemControl.get('isNeeded').value;

    if (isNeeded) {
      itemControl.get('quantity').setValue(0);
      itemControl.get('quantity').disable();
    } else {
      itemControl.get('quantity').enable();
    }
    this.setLocalStorageInventory();
  }

  private getItemControl(idxPage, idxCategory, idxControl): FormControl {
    const nameControl = 'items';
    const categoryFormArray: FormArray = this.pagesInv.controls[idxPage].get('categories') as FormArray;
    const itemFormArray: FormArray = categoryFormArray.controls[idxCategory].get(nameControl) as FormArray;
    return itemFormArray.controls[idxControl] as FormControl;
  }

  public saveInventory(): void {
    this.storeInv.setValue(this.selectedStore.nameAbbreviation);
    this.dbRequestsService.setNewWeeklyInventory(this.inventoryForm.value).then( resp => {
      this.deleteProgress();
      this.router.navigateByUrl(this.urlBack);
      this.toastsService.savedItemToast(this.savedMsg);
    }).catch( err => this.toastsService.errorToast(err.msg));
  }
  
  public deleteProgress(): void {
    this.pagesInv.controls.forEach( page => {
      const pages = page.get('categories') as FormArray;
      try {
        pages.controls.forEach( category => {
          const items = category.get('items') as FormArray;
          items.controls.forEach( item => {
            item.get('quantity').setValue(0);
            item.get('rangeQuantity').setValue(0);
          })
        })
      } catch (error) {
        
      }
    });
    this.inventoryForm.get('date').reset;
    this.deleteLocalStorageInventory();
  }

  private getQuantityFromCache(pageIdx: number, categoryIdx: number, itemIdx: number) {
    return this.cacheInventory.pages[pageIdx].categories[categoryIdx].items[itemIdx].quantity;
  }

  private getIsNeededFromCache(pageIdx: number, categoryIdx: number, itemIdx: number) {
    return this.cacheInventory.pages[pageIdx].categories[categoryIdx].items[itemIdx].isNeeded;
  }
  //#endregion

  //#region LocalStorage
  public setLocalStorageInventory(): any {
    this.inventoryForm.get('date').setValue(Date.now());
    localStorage.setItem(INVENTORY_LS, JSON.stringify(this.inventoryForm.value))
  }

  private getLocalStorageInventory(): any {
    const inventoryLS = JSON.parse(localStorage.getItem(INVENTORY_LS));
    let dateControl= Date.now();
    if ( inventoryLS && inventoryLS.date +  1000*60*60 >= dateControl) {
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
