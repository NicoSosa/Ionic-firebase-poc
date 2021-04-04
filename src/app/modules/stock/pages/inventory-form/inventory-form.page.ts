import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

import { ItemStockModel } from '../../models/itemStock.model';

import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { DbRequestsService } from '../../../../services/db-requests.service';
import { ProductListViewModel } from 'src/app/models/products/productListView.model';
import { ProductsListFormViewModel } from '../../../../models/inventory/products/productsListsForm.model';
import { ProductOfForm } from 'src/app/models/inventory/products/productOfForm.model';
import { ProductsListInventoryViewModel } from '../../../../models/inventory/products/productsListInvetory.model';


@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.page.html',
  styleUrls: ['./inventory-form.page.scss'],
})
export class InventoryFormPage implements OnInit {
  public tittleToolbar: string = 'Inventory Form';
  public urlBack: string = 'stock';

  @ViewChild('slides') slides: IonSlides;

  
  private itemList: ItemStockModel[] = [
    {name: 'Soup'},
    {name: 'Meet'},
    {name: 'Chicken'},
    {name: 'Alfajor'},
    {name: 'Pera'},
    {name: 'Lorem'},
    {name: 'Computad'},
    {name: 'Gelato'},
  ]

  inventoryForm: FormGroup;
  private productsDataLists: ProductListViewModel[];

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dbRequestsService: DbRequestsService) { }

  ngOnInit() {
    this.generateInventoryForm();
    this.getProductsLists();
    // this.itemList.forEach( item => {this.pushItem(item)});
    //ToDo: get List of items and charge it to Stock Form
  }

  // Get Data Region
  //#region 
  private getProductsLists() {
    this.dbRequestsService.getProducts().subscribe( dataList => {
      this.productsDataLists = dataList;
      this.productsDataLists.forEach( dataList => {
        let productsOfForm: ProductOfForm[] =  dataList.products.map( productMapped => {return {
          id: productMapped.id,
          name: productMapped.name,
          quantity: 0,
          rangeQuantity: 0
        }})
        
        this.pushProductsDataList({
          category: dataList.category,
          products: productsOfForm
        })
      });
    })
  }

  //#endregion

  // Formus Logic
  //#region 
  get productsLists(): FormArray {
    return this.inventoryForm.get('productsLists') as FormArray;
  }
  get produce(): FormArray {
    return this.inventoryForm.get('produce') as FormArray;
  }
  get utilities(): FormArray {
    return this.inventoryForm.get('utilities') as FormArray;
  }

  private generateInventoryForm(): void {
    this.inventoryForm = this.formBuilder.group({
      store: this.formBuilder.group({}),
      productsLists: this.formBuilder.array([]),
      produce: this.formBuilder.array([]),
      utilities: this.formBuilder.array([]),
    });
  }

  private pushItem(itemStock: ItemStockModel): void {
    this.productsLists.push(
      this.formBuilder.group({
        name: [itemStock.name],
        inputQuantity: [],
        rangeQuantity: ['']
      })
    );
  }

  private pushProductsDataList(list: ProductsListInventoryViewModel): void {
    this.productsLists.push(
      this.formBuilder.group({
        category: this.formBuilder.group(list.category),
        products: this.formBuilder.array(list.products)
      })
    );
  }

  public inputChange(i: number): void {
    // const inputValue = this.stockItems.controls[i].get('inputQuantity').value;
    // this.stockItems.controls[i].get('rangeQuantity').setValue(inputValue);
  }
  public rangeChange(i: number): void {
    // const slideValue = this.stockItems.controls[i].get('rangeQuantity').value;
    // this.stockItems.controls[i].get('inputQuantity').setValue(slideValue);
  }
  //#endregion

  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }
}
