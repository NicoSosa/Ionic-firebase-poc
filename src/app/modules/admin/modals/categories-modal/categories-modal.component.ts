import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryInventory, InventoryStructure } from '../../../../models/inventories/inventoryStructure.model';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-categories-modal',
  templateUrl: './categories-modal.component.html',
  styleUrls: ['./categories-modal.component.scss'],
})
export class CategoriesModalComponent implements OnInit {
  tittleToolbar1 = 'Category Form';
  @Input() categoryData: CategoryInventory;
  @Input() idxPage: number;
  @Input() idxCategory: number;
  @Input() pagesList: string[];

  // @Input() inventoryStructure: InventoryStructure;

  categoryForm: FormGroup;
  pageRoot: FormControl;
  itsNew: boolean;

  constructor(private modalCtrl: ModalController,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.generateCategoryForm();
    this.itsNew = true;
    if( this.categoryData ) {
      this.itsNew = false;
      this.setCategoryFormByCategoryData();
    }
  }

  private generateCategoryForm(): void {
    this.pageRoot = this.formBuilder.control(this.idxPage);

    this.categoryForm = this.formBuilder.group({
      category: ['', Validators.required],
      items: this.formBuilder.array([]),
    })
  }

  private setCategoryFormByCategoryData(): void {
    this.categoryName.setValue(this.categoryData.category);
    this.categoryData.items.forEach( item => {
      this.categoryItems.push(
        this.formBuilder.group({
          id: [item.id, Validators.required],
          name: [item.name, Validators.required],
          showName: [item.showName, Validators.required],
          unit: [item.unit, Validators.required],
        })
      );
    });
  }

  get categoryName(): FormControl {
    return this.categoryForm.get('category') as FormControl;
  }

  get categoryItems(): FormArray {
    return this.categoryForm.get('items') as FormArray;
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  saveChanges() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
    } else {
      this.modalCtrl.dismiss({
        isDirty: this.categoryForm.dirty || this.pageRoot.dirty,
        categoryForm: this.categoryForm.value,
        idxPage: this.idxPage,
        idxCategory: this.idxCategory,
        pageRoot: this.pageRoot.value,
      });
    }
  }
}
