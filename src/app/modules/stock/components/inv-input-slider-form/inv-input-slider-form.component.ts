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

  public categoryIdx = -1;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.generateCategoryForm();
  }

  private generateCategoryForm(): void {
    let nameCategory = this.pageCategory.category;
    if (this.itsDaily) {
      nameCategory = `${this.pageCategory.category} ready`;
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
    let slidVal = item.slid;
    if (slidVal > 6 && this.itsDaily) {slidVal = 6 };
    if(this.cacheInventory){ quant = this.getQuantityFromCache(pageIdx, categoryIdx, itemIdx);}
    this.categoryItems.push( this.formBuilder.group({
      id: item.id,
      name: item.name,
      showName: item.showName,
      slid: slidVal,
      quantity: [quant, Validators.pattern("^[0-9]*$"),],
      rangeQuantity: quant,
    }));
  }


  public inputChange(itemIdx): void {
    const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
    const inputValue = itemControl.get('quantity').value;
    itemControl.get('rangeQuantity').setValue(inputValue);

    this.setLocalStorageInventory();
  }

  public rangeChange(itemIdx): void {
    const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
    const rangeValue = itemControl.get('rangeQuantity').value;
    itemControl.get('quantity').setValue(rangeValue);
    
    this.setLocalStorageInventory();
  }

  private setLocalStorageInventory() {
    this.setLS.emit(true);
  }

  private getQuantityFromCache(pageIdx: number, categoryIdx: number, itemIdx: number) {
    return this.cacheInventory.pages[pageIdx].categories[categoryIdx].items[itemIdx].quantity;
  }
}