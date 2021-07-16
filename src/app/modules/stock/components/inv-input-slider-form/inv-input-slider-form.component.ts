import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { CategoryInventory, ItemInventory } from '../../../../models/inventories/inventoryStructure.model';

@Component({
  selector: 'app-inv-input-slider-form',
  templateUrl: './inv-input-slider-form.component.html',
  styleUrls: ['./inv-input-slider-form.component.scss'],
})
export class InvInputSliderFormComponent implements OnInit {
  @Input() inventoryForm: FormGroup;
  @Input() idxPage: number;
  @Input() pageCategory: CategoryInventory;
  @Input() cacheInventory: any;
  @Input() itsDaily: boolean;
  @Output() setLS = new EventEmitter<boolean>();
  @Output() endLoading = new EventEmitter<boolean>();
  rangeStep: number[] = [];

  public categoryIdx = -1;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.generateCategoryForm();
  }

  private generateCategoryForm(): void {
    let nameCategory = this.pageCategory.category;
    if (this.itsDaily) {
      nameCategory = `${this.pageCategory.category}`;
    }
    this.categoryForm.push(
      this.formBuilder.group({
        category: nameCategory,
        unit: this.pageCategory.unit,
        formStyle: this.pageCategory.formStyle,
        items: this.formBuilder.array([]),
      }));
      this.categoryIdx = this.categoryForm.length -1;
      this.pageCategory.items.forEach( (item, itemIdx) => this.pushCategoryItem(item, this.idxPage, this.categoryIdx, itemIdx));
      this.endLoading.emit(true);
  }

  get categoryForm(): FormArray {
    let invForm = this.inventoryForm.get('pages') as FormArray;
    return invForm.controls[this.idxPage].get('categories') as FormArray;
  }

  get categoryName(): FormControl {
    let catForm = this.categoryForm.controls[this.categoryIdx] as FormControl;
    return catForm.get('category') as FormControl;
  }

  get categoryUnit(): FormControl {
    let catForm = this.categoryForm.controls[this.categoryIdx] as FormControl;
    return catForm.get('unit') as FormControl;
  }

  get categoryFormStyle(): FormControl {
    let catForm = this.categoryForm.controls[this.categoryIdx] as FormControl;
    return catForm.get('formStyle') as FormControl;
  }

  get categoryItems(): FormArray {
    let catForm = this.categoryForm.controls[this.categoryIdx] as FormControl;
    return catForm.get('items') as FormArray;
  }

  private pushCategoryItem(item: ItemInventory, pageIdx: number, categoryIdx: number, itemIdx: number): void {
    let quant = 0;
    if(this.cacheInventory){ quant = this.getQuantityFromCache(pageIdx, categoryIdx, itemIdx);}
    if (item.isSwitch) {
      this.categoryItems.push( this.formBuilder.group({
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
      }));
    } else {
      let itemStep = item.steps;
      let slidVal = item.slid;
  
      if ( slidVal > 8) { itemStep = 1 }
      if ( slidVal <= 8) { itemStep = 0.5 }
      if ( slidVal <= 5) { itemStep = 0.25 }
      if ( slidVal <= 2) { itemStep = 0.1 }
      this.rangeStep.push(itemStep);
      if (slidVal > 6 && this.itsDaily) {slidVal = 6 };
      if(this.cacheInventory){ quant = this.getQuantityFromCache(pageIdx, categoryIdx, itemIdx);}
      this.categoryItems.push( this.formBuilder.group({
        id: item.id,
        name: item.name,
        showName: item.showName,
        categoryId: item.categoryId,
        unit: item.unit,
        steps: itemStep,
        slid: slidVal,
        quantity: quant,
        rangeQuantity: quant,
      }));
    }
  }


  public inputChange(itemIdx): void {
    const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
    const inputValue = itemControl.get('quantity').value || 0;
    
    itemControl.get('rangeQuantity').setValue(inputValue);
    itemControl.get('quantity').setValue(inputValue);

    this.setLocalStorageInventory();
  }

  controlInput(itemIdx) {
    const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
    let inputValue = itemControl.get('quantity').value || 0;
    
    const decimalPart = inputValue % 1;
    const milecimalPart = inputValue %100
    if (decimalPart !== 0.5 && decimalPart !== 0 && this.rangeStep[itemIdx] >= 0.5) {
      inputValue = Math.round(inputValue);
    }

    if (this.rangeStep[itemIdx] <= 0.1 && milecimalPart !== 0) {
      inputValue =  Math.round(inputValue*10)/10;
    }


    itemControl.get('rangeQuantity').setValue(inputValue);
    itemControl.get('quantity').setValue(inputValue);

    this.setLocalStorageInventory();
  }

  public rangeChange(itemIdx): void {

    const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
    let rangeValue = (itemControl.get('rangeQuantity').value);
    const milecimalPart = rangeValue %100
    if (this.rangeStep[itemIdx] <= 0.1 && milecimalPart !== 0) {
      rangeValue =  Math.round(rangeValue*10)/10;
    }

    itemControl.get('quantity').setValue(rangeValue);
    
    this.setLocalStorageInventory();
  }

  private setLocalStorageInventory() {
    this.setLS.emit(true);
  }

  minusQuant(itemIdx) {
    const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
    const inputValue = itemControl.get('quantity').value;
    if(inputValue > 0) {
      let value = Number(inputValue - this.rangeStep[itemIdx]);
      itemControl.get('rangeQuantity').setValue(value);
      itemControl.get('quantity').setValue(value);
      this.setLocalStorageInventory();
    }
    this.controlInput(itemIdx);
  }

  plusQuant(itemIdx) {
    const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
    const inputValue = itemControl.get('quantity').value;
    const slid = itemControl.get('slid').value;
    if(inputValue < slid) {
      let value = Number(inputValue + this.rangeStep[itemIdx]);
      itemControl.get('rangeQuantity').setValue(value);
      itemControl.get('quantity').setValue(value);
      this.setLocalStorageInventory();
    }
    this.controlInput(itemIdx);
  }

  switchInputChange(itemIdx) {
    const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
    const inputValue = itemControl.get('quantity').value;

    if( (inputValue == 1) ) {
      itemControl.get('rangeQuantity').setValue(1);
      itemControl.get('quantity').setValue(1);
    } else {
      itemControl.get('rangeQuantity').setValue(0);
      itemControl.get('quantity').setValue(0);
    }
  }

  changeCheckNeeded(itemIdx){
    const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
    const rangeValue = (itemControl.get('rangeQuantity').value);
    if(rangeValue) {
      itemControl.get('quantity').setValue(1);
    } else {
      itemControl.get('quantity').setValue(0);
    }
    
    this.setLocalStorageInventory();
  }

  private getQuantityFromCache(pageIdx: number, categoryIdx: number, itemIdx: number) {
    return this.cacheInventory.pages[pageIdx].categories[categoryIdx].items[itemIdx].quantity;
  }
}