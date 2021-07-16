import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { CategoryInventory, ItemInventory } from '../../../../models/inventories/inventoryStructure.model';

@Component({
  selector: 'app-inv-slider-down',
  templateUrl: './inv-slider-down.component.html',
  styleUrls: ['./inv-slider-down.component.scss'],
})
export class InvSliderDownComponent implements OnInit {
  @Input() inventoryForm: FormGroup;
  @Input() idxPage: number;
  @Input() pageCategory: CategoryInventory;
  @Input() cacheInventory: any;
  @Input() itsDaily: boolean;
  @Output() setLS = new EventEmitter<boolean>();
  @Output() endLoading = new EventEmitter<boolean>();
  rangeStep: number[] = [];
  private fromInput: boolean;
  private fromAnotherToInput: boolean;

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


  public controlInput(itemIdx) {
    if(!this.fromAnotherToInput) {
      const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
      let inputValue = itemControl.get('quantity').value.toString();
      let lastLetter = inputValue.slice(inputValue.length - 1);
      let unitAndDecArrays = inputValue.split(".");
      let commaQuant = unitAndDecArrays.length - 1;
      if( !lastLetter) { 
        // When all data was erased
        itemControl.get('rangeQuantity').setValue(0);
        itemControl.get('quantity').setValue(0);
        this.fromInput = true;
      } else {
        if ((lastLetter === "." || Number(lastLetter) || lastLetter == 0) && commaQuant < 2 ){
          if( unitAndDecArrays[1] && unitAndDecArrays[1].length > 2) { 
            // if has more than 2 decimals
            let rollBackValue = Number(inputValue.slice(0, -1));
            itemControl.get('quantity').setValue(rollBackValue);
          } else {
            if( lastLetter === "."  && unitAndDecArrays[0].length === 0) {
              // if entered a . and has no number at left
              itemControl.get('rangeQuantity').setValue(0);
              itemControl.get('quantity').setValue("0.");
            } else {
              let value = Number(inputValue);
              itemControl.get('quantity').setValue(value);
              itemControl.get('rangeQuantity').setValue(value);
            }
            this.fromInput = true;
          }
        } else {
          let rollBackValue = Number(inputValue.slice(0, -1));
          itemControl.get('quantity').setValue(rollBackValue);
        }
      }      
    }
    this.fromAnotherToInput = false;
  }

  public blurInput(itemIdx) {
    const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
    let inputValue = Number(itemControl.get('quantity').value.toString());
    itemControl.get('rangeQuantity').setValue(inputValue);
    itemControl.get('quantity').setValue(inputValue);
    this.fromInput = true;
    this.fromAnotherToInput = true;
  }

  public rangeChange(itemIdx): void {
    if( !this.fromInput) {
      console.log('Range Change');
      const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
      let rangeValue = (itemControl.get('rangeQuantity').value);

      const decimalPart = rangeValue % 1;
      const milecimalPart = rangeValue %100
      if (this.rangeStep[itemIdx] == 0.1 && milecimalPart !== 0) {
        rangeValue =  Math.round(rangeValue*10)/10;
      }

      if (this.rangeStep[itemIdx] === 0.25 && decimalPart === 0.5) {
        rangeValue = `${rangeValue}0`;
      }
      if (this.rangeStep[itemIdx] === 0.25 && decimalPart === 0) {
        rangeValue = `${rangeValue}.00`;
      }
      
      itemControl.get('quantity').setValue(rangeValue);
      
      this.setLocalStorageInventory();
    }
    this.fromAnotherToInput = true;
    this.fromInput = false;
  }

  private setLocalStorageInventory() {
    this.setLS.emit(true);
  }

  minusQuant(itemIdx) {
    const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
    const inputValue = Number(itemControl.get('quantity').value);
    console.log('Minus');
    if(inputValue > 0) {
      let value = Number(inputValue - this.rangeStep[itemIdx]);
      let fixedValue;
      itemControl.get('rangeQuantity').setValue(value);

      const decimalPart = value % 1;
      const milecimalPart = value %100
      if (this.rangeStep[itemIdx] == 0.1 && milecimalPart !== 0) {
        fixedValue =  Math.round(value*10)/10;
      } else {
        if (this.rangeStep[itemIdx] === 0.25 && decimalPart === 0.5) {
          fixedValue = `${value}0`;
        } else {
          if (this.rangeStep[itemIdx] === 0.25 && decimalPart === 0) {
            fixedValue = `${value}.00`;
          } else {
            fixedValue = value;
          }
        }
      }
      itemControl.get('quantity').setValue(fixedValue);


      this.setLocalStorageInventory();
    }
    this.fromAnotherToInput = true;
    this.fromInput = true;
  }

  plusQuant(itemIdx) {
    const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
    const inputValue = Number(itemControl.get('quantity').value);
    console.log('suma');
    const slid = itemControl.get('slid').value;
    if(inputValue < slid) {
      let value = Number(inputValue + this.rangeStep[itemIdx]);
      itemControl.get('rangeQuantity').setValue(value);
      let fixedValue;

      const decimalPart = value % 1;
      const milecimalPart = value %100
      if (this.rangeStep[itemIdx] == 0.1 && milecimalPart !== 0) {
        fixedValue =  Math.round(value*10)/10;
      } else {
        if (this.rangeStep[itemIdx] === 0.25 && decimalPart === 0.5) {
          fixedValue = `${value}0`;
        } else {
          if (this.rangeStep[itemIdx] === 0.25 && decimalPart === 0) {
            fixedValue = `${value}.00`;
          } else {
            fixedValue = value;
          }
        }
      }
      itemControl.get('quantity').setValue(fixedValue);

      this.setLocalStorageInventory();
    }
    this.fromAnotherToInput = true;
    this.fromInput = true;
  }

  switchInputChange(itemIdx) {
    const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
    const inputValue = Number(itemControl.get('quantity').value);

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