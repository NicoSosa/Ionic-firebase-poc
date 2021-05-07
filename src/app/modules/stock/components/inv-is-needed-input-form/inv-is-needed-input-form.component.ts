import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { CategoryInventory, ItemInventory } from '../../../../models/inventories/inventoryStructure.model';

@Component({
  selector: 'app-inv-is-needed-input-form',
  templateUrl: './inv-is-needed-input-form.component.html',
  styleUrls: ['./inv-is-needed-input-form.component.scss'],
})
export class InvIsNeededInputFormComponent implements OnInit {
  @Input() inventoryForm: FormGroup;
  @Input() idxPage: number;
  @Input() pageCategory: CategoryInventory;
  @Input() cacheInventory: any;
  @Output() setLS = new EventEmitter<boolean>();

  public categoryIdx = -1;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.generateCategoryForm();
  }

  private generateCategoryForm(): void {
    this.categoryForm.push(
      this.formBuilder.group({
        category: this.pageCategory.category,
        unit: this.pageCategory.unit,
        formStyle: this.pageCategory.formStyle,
        items: this.formBuilder.array([]),
      }));
      this.categoryIdx = this.categoryForm.length -1;
      this.pageCategory.items.forEach( (item, itemIdx) => this.pushCategoryItem(item, this.idxPage, this.categoryIdx, itemIdx));

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
    let isNeed = false;
    if(this.cacheInventory){ 
      quant = this.getQuantityFromCache(pageIdx, categoryIdx, itemIdx);
      isNeed = this.getIsNeededFromCache(pageIdx, categoryIdx, itemIdx);
    };

    this.categoryItems.push( this.formBuilder.group({
      id: item.id,
      name: item.name,
      showName: item.showName,
      unit: item.unit,
      quantity: {value: quant | 0, disabled: !isNeed},
      isNeeded: isNeed,
    }));
  }

  public changeCheckNeeded(itemIdx): void {
    const itemControl = this.categoryItems.controls[itemIdx];
    const isNeeded: boolean = !itemControl.get('isNeeded').value;

    if (isNeeded) {
      itemControl.get('quantity').setValue(0);
      itemControl.get('quantity').disable();
    } else {
      itemControl.get('quantity').enable();
    }
    this.setLocalStorageInventory();
  }

  public setLocalStorageInventory() {
    this.setLS.emit(true);
  }

  private getQuantityFromCache(pageIdx: number, categoryIdx: number, itemIdx: number) {
    return this.cacheInventory.pages[pageIdx].categories[categoryIdx].items[itemIdx].quantity;
  }

  private getIsNeededFromCache(pageIdx: number, categoryIdx: number, itemIdx: number) {
    return this.cacheInventory.pages[pageIdx].categories[categoryIdx].items[itemIdx].isNeeded;
  }
}
