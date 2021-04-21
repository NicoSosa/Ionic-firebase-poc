import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemOfAdministration } from '../../../../models/administration/itemOfAdministration.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryStructure } from '../../../../models/inventories/inventoryStructure.model';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss'],
})
export class ItemModalComponent implements OnInit {
  tittleToolbar1 = 'Item Form';
  @Input() itemData: ItemOfAdministration;
  @Input() inventoryStructure: InventoryStructure;

  itemForm: FormGroup;
  itsNew: boolean;
  
  constructor(private modalCtrl: ModalController,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.generateItemForm();
    this.itsNew = true;
    if (this.itemData) {
      this.itsNew = false;
      this.setItemFormByItemData();  
    };
  }

  private generateItemForm(): void {
    this.itemForm = this.formBuilder.group({
      id: ['',Validators.required],
      name: ['',Validators.required],
      showName: ['',Validators.required],
      unit: ['',Validators.required],
      idxPage: [-1,[Validators.required, Validators.min(0)]],
      idxCategory: [-1,[Validators.required, Validators.min(0)]],
    })
  }

  get id(): FormControl { return this.itemForm.get('id') as FormControl }
  get name(): FormControl { return this.itemForm.get('name') as FormControl }
  get showName(): FormControl { return this.itemForm.get('showName') as FormControl }
  get unit(): FormControl { return this.itemForm.get('unit') as FormControl }
  get idxPage(): FormControl { return this.itemForm.get('idxPage') as FormControl }
  get idxCategory(): FormControl { return this.itemForm.get('idxCategory') as FormControl }

  private setItemFormByItemData(): void {
    this.id.setValue(this.itemData.id);
    this.name.setValue(this.itemData.name);
    this.showName.setValue(this.itemData.showName);
    this.unit.setValue(this.itemData.unit);
    this.idxPage.setValue(this.itemData.idxPage);
    this.idxCategory.setValue(this.itemData.idxCategory);
  }

  public filterPageChange(): void {
    this.idxCategory.setValue(-1);
  }

  deleteItem(){
    this.itemForm.markAsDirty();
    this.modalCtrl.dismiss({
      isDirty: this.itemForm.dirty,
      delete: true,
    });
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  saveChanges() {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
    } else {
      this.modalCtrl.dismiss({
        isDirty: this.itemForm.dirty,
        delete: false,
        itemForm: this.itemForm.value,
        isNew: this.itsNew,
      });
    }
  }
}
