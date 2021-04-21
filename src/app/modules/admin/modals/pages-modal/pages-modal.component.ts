import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PageInventory } from '../../../../models/inventories/inventoryStructure.model';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-pages-modal',
  templateUrl: './pages-modal.component.html',
  styleUrls: ['./pages-modal.component.scss'],
})
export class PagesModalComponent implements OnInit {
  tittleToolbar1 = 'Page Form';
  @Input() pageData: PageInventory;
  @Input() idxPage: number;

  pageForm: FormGroup;
  itsNew: boolean;

  constructor(private modalCtrl: ModalController,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.generatePageForm();
    this.itsNew = true
    if(this.pageData) { 
      this.itsNew = false;
      this.setPageFormByPageData();
    }
  }

  private generatePageForm(): void {
    this.pageForm = this.formBuilder.group({
      name: ['', Validators.required],
      categories: this.formBuilder.array([]),
    }); 
  }

  private setPageFormByPageData(): void {
    this.pageName.setValue(this.pageData.name);
    this.pageData.categories.forEach( category => {
      this.pageCategories.push(
        this.formBuilder.group({
          category: category.category,
          items: this.formBuilder.array(category.items)
        })
      )
    });
  }

  get pageCategories(): FormArray {
    return this.pageForm.get('categories') as FormArray;
  }

  get pageName(): FormControl {
    return this.pageForm.get('name') as FormControl;
  }

  addCategory(){
    this.pageCategories.push(
      this.formBuilder.group({ 
        category: ['', Validators.required],
        items: this.formBuilder.array([]) 
      })
    )
  }

  deleteCategory(idxCategory){
    this.pageCategories.removeAt(idxCategory);
    this.pageForm.markAsDirty();
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  saveChanges() {
    if (this.pageForm.invalid) {
      this.pageForm.markAllAsTouched();
    } else {
      this.modalCtrl.dismiss({
        isDirty: this.pageForm.dirty,
        pageForm: this.pageForm.value,
        idxPage: this.idxPage,
      });
    }
  }
}
