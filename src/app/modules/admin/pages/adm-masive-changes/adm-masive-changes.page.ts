import { Component, OnInit } from '@angular/core';
import { ADMIN_MASIVE_TITLE_TOOLBAR, ADMIN_URL } from '../../constants/adminPageConstants';
import { MASIVE_OPTIONS } from '../../constants/structureAdminPage';
import { InventoryStructure } from '../../../../models/inventories/inventoryStructure.model';
import { DbRequestsService } from '../../../../services/db-requests.service';
import { ItemOfMasive } from '../../../../models/administration/itemOfMasive.model';

@Component({
  selector: 'app-adm-masive-changes',
  templateUrl: './adm-masive-changes.page.html',
  styleUrls: ['./adm-masive-changes.page.scss'],
})
export class AdmMasiveChangesPage implements OnInit {
  public tittleToolbar = ADMIN_MASIVE_TITLE_TOOLBAR;
  public urlBack = ADMIN_URL;
  public masiveOptions = MASIVE_OPTIONS;

  public inventoryStructure: InventoryStructure
  public itemList = [];

  constructor(private dbRequestsService: DbRequestsService) { 
  }

  ngOnInit() {
    this.getData();
  }

  private getData(): void {
    this.dbRequestsService.getWeeklyStructure().subscribe( struct => {
      this.inventoryStructure = struct[0];
      this.setItemList();
    });
  }

  private setItemList() {
    this.itemList = this.inventoryStructure.pages.map( (page, idxPage) => {
      return {
        name: page.name,
        categories: page.categories.map( (category, idxCategory) => {
          return {
            category: category.category,
            isIndeterminate: false,
            masterCheck: false,
            items: category.items.map( (item,idxItem) => {
              return{...item,idxPage,idxCategory,idxItem, isChecked: false};
            })
          }
        })
      }      
    });
  }


  segmentChanged(event): void{
    this.masiveOptions.forEach( opt => opt.active = false);
    const selectedIndex = event.detail.value;
    this.masiveOptions[selectedIndex].active = true;
  }


  checkMaster(ev, idxPage, idxCategory) {
    setTimeout(()=>{
      this.itemList[idxPage].categories[idxCategory].items.forEach(obj => {
        obj.isChecked = this.itemList[idxPage].categories[idxCategory].masterCheck;
      });
    });
  }

  checkEvent(item) {
    const totalItems = this.itemList[item.idxPage]
                        .categories[item.idxCategory]
                        .items.length;
    let checked = 0;
    this.itemList[item.idxPage]
                        .categories[item.idxCategory]
                        .items.map(obj => {
                            if (obj.isChecked) checked++;
                        });
    if (checked > 0 && checked < totalItems) {
      //If even one item is checked but not all
      this.itemList[item.idxPage]
          .categories[item.idxCategory]
          .isIndeterminate = true;
      this.itemList[item.idxPage]
          .categories[item.idxCategory]
          .masterCheck = false;
    } else if (checked == totalItems) {
      //If all are checked
      this.itemList[item.idxPage]
          .categories[item.idxCategory]
          .masterCheck = true;
      this.itemList[item.idxPage]
          .categories[item.idxCategory]
          .isIndeterminate = false;
    } else {
      //If none is checked
      this.itemList[item.idxPage]
          .categories[item.idxCategory]
          .isIndeterminate = false;
      this.itemList[item.idxPage]
          .categories[item.idxCategory]
          .masterCheck = false;
    }
  }

  moveSelection(): void{}
  deleteSelection(): void{}
}
