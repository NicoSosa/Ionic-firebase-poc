import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { InventoryStructure, ItemInventory, PageInventory } from 'src/app/models/inventories/inventoryStructure.model';
import { StoresName, StoresNameDescript } from '../../../infrastructure/enum/stores.enum';
import { CategoryInventory } from '../../../models/inventories/inventoryStructure.model';
import { FormType } from '../../../infrastructure/enum/formType.enum';
import { FormStyle } from '../../../infrastructure/enum/formStyle.enum';

@Injectable({
  providedIn: 'root'
})
export class ManagInventoryFormService {
  private inventoryForm: FormGroup;
  private formType: FormType;
  private cacheInventory: any;

  constructor(
    private formBuilder: FormBuilder
    ) { }

  private get pagesForm(): FormArray {
    return this.inventoryForm.get('pages') as FormArray;
  }

  public generateAndGetInventoryForm( inventoryStructure: InventoryStructure, selectedStore: StoresName, formType: FormType, cacheInventory: any): FormGroup { 
    // console.log(inventoryStructure);
    // console.log('Store: ' + selectedStore);
    // console.log('Form Type: ' + formType);
    // console.log(cacheInventory);
    this.formType = formType;
    this.cacheInventory = cacheInventory;

    this.inventoryForm = this.formBuilder.group({
      store: selectedStore,
      storeName: StoresNameDescript.get(selectedStore),
      pages: this.formBuilder.array([]),
      createdDate: '',
    });

    inventoryStructure.pages.forEach( (pageStructure, pageIdx) => {
      this.pushPageInv(pageStructure, pageIdx);
    });
    this.pushFinalPage();

    return this.inventoryForm;
  }


  private pushPageInv(pageStructure: PageInventory, pageIdx: number): void {
    this.pagesForm.push(
      this.formBuilder.group({
        name: pageStructure.name,
        categories: this.formBuilder.array([]),
      })
    );

    pageStructure.categories.forEach( (categoryStructure, categoryIdx) => {
      this.generateCategoryForm(categoryStructure, pageIdx, categoryIdx)
    });
  }

  private pushFinalPage(): void {
    this.pagesForm.push(
      this.formBuilder.group({
        name: 'Final page',
        observation: '',
      })
    );
  }


  private generateCategoryForm(categoryStructure: CategoryInventory, pageIdx: number, categoryIdx: number): void {
    let nameCategory = categoryStructure.category;
    let categoryForm = this.pagesForm.controls[pageIdx].get('categories') as FormArray;
    // console.log(nameCategory);
    // console.log(categoryIdx);
    // if (this.itsDaily) {
    //   nameCategory = `${pageCategory.category}`;
    // }
    categoryForm.push(
      this.formBuilder.group({
        category: nameCategory,
        unit: categoryStructure.unit,
        formStyle: categoryStructure.formStyle,
        items: this.formBuilder.array([]),
      }));
      // this.categoryIdx = this.categoryForm.length -1;
      categoryStructure.items.forEach( (item, itemIdx) => {
        this.pushCategoryItem(categoryForm, item, pageIdx, categoryIdx, itemIdx)
      });
  }


  private pushCategoryItem(categoryForm: FormArray, item: ItemInventory, pageIdx: number, categoryIdx: number, itemIdx: number): void {
    let quant = 0;
    let itemForm = categoryForm.controls[categoryIdx].get('items') as FormArray;
    let itemFormStyle = categoryForm.controls[categoryIdx].get('formStyle').value;

    if(this.cacheInventory){ quant = this.getQuantityFromCache(pageIdx, categoryIdx, itemIdx);}
    if (item.isSwitch) {
      itemForm.push( this.formBuilder.group({
        id: item.id,
        name: item.name,
        showName: item.showName,
        categoryId: item.categoryId,
        unit: item.unit,
        isSwitch: item.isSwitch,
        steps: 1,
        slid: 1,
        quantity: quant,
        rangeQuantity: quant,
        formStyle: itemFormStyle,
      }));
    } else {
      let itemStep = item.steps;
      let slidVal = item.slid;
  
      // if ( slidVal > 8) { itemStep = 1 }
      // if ( slidVal <= 8) { itemStep = 0.5 }
      // if ( slidVal <= 5) { itemStep = 0.25 }
      // if ( slidVal <= 2) { itemStep = 0.1 }
      // this.rangeStep.push(itemStep);
      // if (slidVal > 6 && this.itsDaily) {slidVal = 6 };
      // if(this.cacheInventory){ quant = this.getQuantityFromCache(pageIdx, categoryIdx, itemIdx);}
      itemForm.push( this.formBuilder.group({
        id: item.id,
        name: item.name,
        showName: item.showName,
        categoryId: item.categoryId,
        unit: item.unit,
        steps: itemStep,
        slid: slidVal,
        quantity: quant,
        rangeQuantity: quant,
        formStyle: itemFormStyle,
      }));
    }
  }

  private getQuantityFromCache(pageIdx: number, categoryIdx: number, itemIdx: number) {
    if(this.cacheInventory.pages[pageIdx].categories[categoryIdx]) {
      return this.cacheInventory.pages[pageIdx].categories[categoryIdx].items[itemIdx].quantity;
    }
  }
}
