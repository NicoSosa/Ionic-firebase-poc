import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-inv-is-needed-hide-form',
  templateUrl: './inv-is-needed-hide-form.component.html',
  styleUrls: ['./inv-is-needed-hide-form.component.scss'],
})
export class InvIsNeededHideFormComponent implements OnInit {
  @Input() inventoryForm: FormGroup;
  @Input() pageIdx: number;
  @Input() categoryIdx: number;
  @Input() filterWord: string;
  @Output() setLS = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  get categoryForm(): FormArray {
    let invForm = this.inventoryForm.get('pages') as FormArray;
    return invForm.controls[this.pageIdx].get('categories') as FormArray;
  }

  get categoryName(): FormControl {
    let catForm = this.categoryForm.controls[this.categoryIdx] as FormControl;
    return catForm.get('category') as FormControl;
  }

  get categoryIsHide(): FormControl {
    let catForm = this.categoryForm.controls[this.categoryIdx] as FormControl;
    return catForm.get('isHide') as FormControl;
  }

  get categoryItems(): FormArray {
    let catForm = this.categoryForm.controls[this.categoryIdx] as FormControl;
    return catForm.get('items') as FormArray;
  }

  public changeCheckNeeded(itemControl: FormControl): void {
    const isNeeded: boolean = !itemControl.get('isNeeded').value;
    this.setLocalStorageInventory();
  }

  toggleHide(){
    let isHide = !this.categoryIsHide.value;
    this.categoryIsHide.setValue(isHide);
    if(isHide){
      // Set value to false
    } else {
      // do nothing
    }
    this.setLocalStorageInventory();
  }

  public setLocalStorageInventory() {
    this.setLS.emit(true);
  }
}
