import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-inv-is-needed-only-form',
  templateUrl: './inv-is-needed-only-form.component.html',
  styleUrls: ['./inv-is-needed-only-form.component.scss'],
})
export class InvIsNeededOnlyFormComponent implements OnInit {
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

  public changeCheckNeeded(itemControl: FormControl): void {
    const isNeeded: boolean = !itemControl.get('isNeeded').value;
    this.setLocalStorageInventory();
  }

  public setLocalStorageInventory() {
    this.setLS.emit(true);
  }

}
