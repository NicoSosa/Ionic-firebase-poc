import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { DbRequestsService } from '../../../../services/db-requests.service';
import { INVENTORY_TITLE_NAME, STOCK_URL } from '../../constants/inventorySlidesName';
import { InventoryStructure, PageInventory, CategoryInventory, ItemInventory } from '../../../../models/inventories/inventoryStructure.model';

const INVENTORY_LS ='inventoryLocalStorage'

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.page.html',
  styleUrls: ['./inventory-form.page.scss'],
})
export class InventoryFormPage implements OnInit {
  public tittleToolbar = INVENTORY_TITLE_NAME;
  public urlBack = STOCK_URL;
  public cacheInventory: any;

  @ViewChild('slides') slides: IonSlides;
  public slidesButtonStatus: any[] = [ {active: false,text: '', lastPage: false}, {active: false, text: '', lastPage: false}];

  inventoryForm: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dbRequestsService: DbRequestsService) { }

  ngOnInit() {
    this.cacheInventory = this.getLocalStorageInventory();
    this.generateInventoryForm();
    this.getInventoryStruct();
    
    //ToDo: get List of items and charge it to Stock Form
  }

  //#region - Get Data
  private getInventoryStruct() {
    this.dbRequestsService.getStructure().subscribe( struct => {
      this.slidesButtonStatus[0] = { active: false, text: '', lastPage: false }
        this.slidesButtonStatus[1] = { active: true, text: struct.pages[1].name, lastPage: false}
      struct.pages.forEach( (page, pageIdx) => this.pushPageInv(page, pageIdx) )
      this.pushFinalPage();
    });
  }
  //#endregion

  //#region - Forms Logic
  private generateInventoryForm(): void {
    this.inventoryForm = this.formBuilder.group({
      store: '',
      employee: '',
      pages: this.formBuilder.array([]),
      date: '',
      status: '',
    });
  }

  get pagesInv(): FormArray {
    return this.inventoryForm.get('pages') as FormArray;
  }

  private pushFinalPage(): void {
    this.pagesInv.push(
      this.formBuilder.group({
        name: 'complete',
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
      items: this.formBuilder.array([]),
    }));
    const categoryPosition = categoryArrayControl.length -1;
    const itemControl = categoryArrayControl.controls[categoryPosition].get('items');
    categoryInventory.items.forEach( (item, itemIdx) => this.pushCategoryItem(itemControl, item, pageIdx, categoryIdx, itemIdx));
  }

  private pushCategoryItem(itemArrayControl, item: ItemInventory, pageIdx: number, categoryIdx: number, itemIdx: number): void {
    let quant = 0;
    if(this.cacheInventory){ quant = this.getQuantityFromCache(pageIdx, categoryIdx, itemIdx);}
    itemArrayControl.push( this.formBuilder.group({
      id: item.id,
      name: item.name,
      showName: item.showName,
      unit: item.unit,
      quantity: quant,
      rangeQuantity: quant,
    }));
  }

  public inputChange(idxPage, idxCategory, idxControl): void {
    const nameControl = 'items';
    const categoryFormArray: FormArray = this.pagesInv.controls[idxPage].get('categories') as FormArray;
    const itemFormArray: FormArray = categoryFormArray.controls[idxCategory].get(nameControl) as FormArray;

    const inputValue = itemFormArray.controls[idxControl].get('quantity').value;
    itemFormArray.controls[idxControl].get('rangeQuantity').setValue(inputValue);

    this.inventoryForm.get('date').setValue(Date.now());
    this.setLocalStorageInventory();
  }

  public rangeChange(idxPage, idxCategory, idxControl): void {
    const nameControl = 'items';
    const categoryFormArray: FormArray = this.pagesInv.controls[idxPage].get('categories') as FormArray;
    const itemFormArray: FormArray = categoryFormArray.controls[idxCategory].get(nameControl) as FormArray;

    const rangeValue = itemFormArray.controls[idxControl].get('rangeQuantity').value;
    itemFormArray.controls[idxControl].get('quantity').setValue(rangeValue);
    this.inventoryForm.get('date').setValue(Date.now());
    this.setLocalStorageInventory();
  }

  public saveInventory(): void {
    const asd = JSON.stringify(this.inventoryForm.value);
    console.log(asd);
    console.log(this.inventoryForm.value);
  }
  
  public deleteInventory(): void {
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
  //#endregion

  //#region LocalStorage
  private setLocalStorageInventory(): any {
    localStorage.setItem(INVENTORY_LS, JSON.stringify(this.inventoryForm.value))
  }

  private getLocalStorageInventory(): any {
    const inventoryLS = JSON.parse(localStorage.getItem(INVENTORY_LS));
    let dateControl= Date.now();
    console.log('inventory: '+ inventoryLS.date);
    console.log('control: ' + dateControl);
    if (inventoryLS.date +  1000*60 >= dateControl) {
      console.log('superior');
      return inventoryLS;
    } else {
      console.log('menor');
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
