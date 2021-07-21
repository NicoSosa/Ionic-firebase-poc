import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ItemsLogicService } from '../../services/items-logic.service';

@Component({
  selector: 'app-inv-input-slider-form',
  templateUrl: './inv-input-slider-form.component.html',
  styleUrls: ['./inv-input-slider-form.component.scss'],
})
export class InvInputSliderFormComponent implements OnInit {
  @Input() inventoryForm: FormGroup;
  @Input() pageIdx: number;
  @Input() categoryIdx: number;
  @Output() setLS = new EventEmitter<boolean>();
  private fromInput: boolean;
  private fromAnotherToInput: boolean;

  constructor(private itemsLogicService: ItemsLogicService) { }

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

  get categoryItems(): FormArray {
    let catForm = this.categoryForm.controls[this.categoryIdx] as FormControl;
    return catForm.get('items') as FormArray;
  }

  public controlInput(itemIdx) {
    if(!this.fromAnotherToInput) {
      const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
      this.itemsLogicService.controlInput(itemControl);
    }
    this.fromAnotherToInput = false;
  }

  public blurInput(itemIdx) {
    const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
    this.itemsLogicService.blurInput(itemControl);
    this.fromInput = true;
    this.fromAnotherToInput = true;
    this.setLocalStorageInventory();
  }

  public rangeChange(itemIdx): void {
    if( !this.fromInput) {
      const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
      this.itemsLogicService.rangeChange(itemControl);
      
      this.setLocalStorageInventory();
    }
    this.fromAnotherToInput = true;
    this.fromInput = false;
  }

  minusQuant(itemIdx) {
    const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
    this.itemsLogicService.minusQuant(itemControl);
    this.setLocalStorageInventory();
    this.fromAnotherToInput = true;
    this.fromInput = true;
  }

  plusQuant(itemIdx) {
    const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
    this.itemsLogicService.plusQuant(itemControl);
    this.setLocalStorageInventory();
    this.fromAnotherToInput = true;
    this.fromInput = true;
  }

  switchInputChange(itemIdx) {
    const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
    this.itemsLogicService.switchInputChange(itemControl);
  }

  changeCheckNeeded(itemIdx){
    const itemControl = this.categoryItems.controls[itemIdx] as FormControl;
    this.itemsLogicService.changeCheckNeeded(itemControl);
    
    this.setLocalStorageInventory();
  }

  private setLocalStorageInventory() {
    this.setLS.emit(true);
  }

}