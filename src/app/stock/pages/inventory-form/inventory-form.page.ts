import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ItemStockModel } from '../../models/itemStock.model';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.page.html',
  styleUrls: ['./inventory-form.page.scss'],
})
export class InventoryFormPage implements OnInit {
  public tittleToolbar: string = 'Inventory Form';
  public urlBack: string = 'stock';
  
  private itemList: ItemStockModel[] = [
    {name: 'Soup'},
    {name: 'Meet Empanada'},
    {name: 'Chicken Empanada'},
    {name: 'Alfajor'},
  ]

  stockForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.generateStockForm();
    this.itemList.forEach( item => {this.pushItem(item)});
    //ToDo: get List of items and charge it to Stock Form
  }

  get stockItems(): FormArray {
    return this.stockForm.get('stockItems') as FormArray;
  }
  private generateStockForm(): void {
    this.stockForm = this.formBuilder.group({
      stockItems: this.formBuilder.array([]),
    });
  }

  private pushItem(itemStock: ItemStockModel): void {
    this.stockItems.push(
      this.formBuilder.group({
        name: [itemStock.name],
        inputQuantity: [],
        sliderQuantity: ['']
      })
    );
  }

  public inputChange(i: number): void {
    const inputValue = this.stockItems.controls[i].get('inputQuantity').value;
    this.stockItems.controls[i].get('sliderQuantity').setValue(inputValue);
  }
  public sliderChange(i: number): void {
    const slideValue = this.stockItems.controls[i].get('sliderQuantity').value;
    this.stockItems.controls[i].get('inputQuantity').setValue(slideValue);
  }
}
