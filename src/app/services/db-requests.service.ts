import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreViewModel } from '../models/stores/storeView.model';
import { InventoryViewModel } from '../models/inventories/inventoryView.Model';
import { InventoryStructure, DBInventoryStructure } from '../models/inventories/inventoryStructure.model';
import { STORES_NAME } from '../modules/stock/constants/inventoryConstants';
import { INITIAL_INVENTORY_STRUCT, INITIAL_DAILY_INVENTORY_STRUCT } from '../infrastructure/constants/inventoryStructure.constant';


@Injectable({
  providedIn: 'root'
})
export class DbRequestsService {
  private weeklyInventoryCollection: AngularFirestoreCollection<any>;
  private weeklyInventories: Observable<any>;
  private dailyInventoryCollection: AngularFirestoreCollection<any>;
  private dailyInventories: Observable<any>;
  private weeklyInventoryStructureCollection: AngularFirestoreCollection<DBInventoryStructure>;
  private weeklyInventoryStructure: Observable<DBInventoryStructure[]>;
  private dailyInventoryStructureCollection: AngularFirestoreCollection<DBInventoryStructure>;
  private dailyInventoryStructure: Observable<DBInventoryStructure[]>;
  private storesAbr = STORES_NAME;
  
  private constInventoryStructure: InventoryStructure = INITIAL_INVENTORY_STRUCT;
  private constDailyInventoryStructure: InventoryStructure = INITIAL_DAILY_INVENTORY_STRUCT;

  private storeList: StoreViewModel[] = [
    {
      id: 'c556b629-e72b-4837-b481-349352afa870',
      name: 'Riverside',
      nameAbbreviation: 'RVS'
    },
    {
      id: '83ed22cb-9166-437f-8eb0-c5e536e24303',
      name: 'La Grange',
      nameAbbreviation: 'LGE'
    },
    {
      id: '9ce6aa2b-9e35-4f14-89eb-0215890afb12',
      name: 'Homewood',
      nameAbbreviation: 'HWD'
    },
  ]

  private inventoryLists: InventoryViewModel[] = [
    {
      createdDate: 1618990994195,
      id: 'ab875829-525a-47b6-8fbb-970ccb76b7ad',
      store: 'Riverside',
      user: 'Sosa Leandro',
      products: [
        {
          category: 'Empanadas',
          items: [
            {
              name: 'Meet',
              quantity: 8
            },
            {
              name: 'Chicken',
              quantity: 10
            },
            {
              name: 'BBQ Pork',
              quantity: 14
            },
            {
              name: 'Sausage',
              quantity: 12
            },
            {
              name: 'Ham & Cheese',
              quantity: 5
            },
            {
              name: 'Tuna',
              quantity: 11
            },
            {
              name: 'Bacon',
              quantity: 12
            },
            {
              name: 'Caprese',
              quantity: 9
            },
            {
              name: 'Spinach',
              quantity: 2
            },
            {
              name: 'Mushroom',
              quantity: 8
            },
            {
              name: 'Corn',
              quantity: 5
            },
            {
              name: 'Onion',
              quantity: 3
            },
            {
              name: 'Broccoli',
              quantity: 12
            },
            {
              name: 'Apple',
              quantity: 6
            },
            {
              name: 'Banana',
              quantity: 13
            },
            {
              name: 'Pepperoni',
              quantity: 12
            },
            {
              name: 'Buffalo Chick',
              quantity: 8
            },
            {
              name: '4 Cheese',
              quantity: 2
            },
            {
              name: 'Spin',
              quantity: 7
            },
            {
              name: 'Potato',
              quantity: 3
            },
            {
              name: 'Soy',
              quantity: 12
            },
            
          ]
        },
        {
          category: 'Gelato',
          items: [
            {
              name: 'Swiss Chocolate',
              quantity: 3
            },
            {
              name: 'Cappuccino Dark ',
              quantity: 6
            },
            {
              name: 'Chocolate Almond Fudge',
              quantity: 13
            },
            {
              name: 'White Chocolate Raspberry',
              quantity: 12
            },
            {
              name: 'French Vanilla',
              quantity: 8
            },
            {
              name: 'Banana Walnut',
              quantity: 2
            },
            {
              name: 'Creme de menthe ',
              quantity: 12
            },
            {
              name: 'Fresh Strawberry',
              quantity: 5
            },
            {
              name: 'Italian Pistachio',
              quantity: 11
            },
            {
              name: 'Fresh Mango ',
              quantity: 12
            },
            {
              name: 'Fresh Coconut',
              quantity: 9
            },
            {
              name: 'Wildberry ',
              quantity: 2
            },
          ]
        },
        {
          category: 'Others',
          items: [
            {
              name: 'Toro Espresso Decaf',
              quantity: 11
            },
            {
              name: 'Toro Espresso',
              quantity: 2
            },
            {
              name: 'Lavazza Caffe Macinato',
              quantity: 13
            },
            {
              name: 'Water',
              quantity: 4
            },
          ]
        }
      ],
      produces: [
        {
          name: 'Ground beef',
          quantity: 11,
          unit: 'st'
        },
        {
          name: 'Pork loin',
          quantity: 12,
          unit: 'st'
        },
        {
          name: 'Bacon',
          quantity: 9,
          unit: 'st'
        },
        {
          name: 'Sausage',
          quantity: 12,
          unit: 'st'
        },
        {
          name: 'Pepperoni',
          quantity: 6,
          unit: 'st'
        },
        {
          name: 'Tuna',
          quantity: 13,
          unit: 'st'
        },
      ],
      utilities: [
        {
          category: 'For Food',
          items: [
              {
                name: 'Pizza Box 12in',
                quantity: 1,
                unit: 'Box 100'
              },
              {
                name: 'Pizza Box 14in',
                quantity: 12,
                unit: 'Box 100'
              },
              {
                name: 'Pizza Box Wax Paper 12in',
                quantity: 13,
                unit: 'Box 100'
              },
              {
                name: 'Pizza Box Wax Paper: 14in',
                quantity: 3,
                unit: 'Box 100'
              },
              {
                name: 'Forks',
                quantity: 14,
                unit: 'Box 100'
              },
              {
                name: 'Knives',
                quantity: 11,
                unit: 'Box 100'
              },
              {
                name: 'Soup Spoons',
                quantity: 10,
                unit: 'Box 100'
              },
              {
                name: 'Spoons',
                quantity: 7,
                unit: 'Box 100'
              },
              {
                name: 'Straws',
                quantity: 9,
                unit: 'Box 100'
              },
              {
                name: 'Wood Stirrers',
                quantity: 13,
                unit: 'Box 100'
              },
              {
                name: 'Container Cup: 1 oz',
                quantity: 7,
                unit: 'Box 100'
              },
              {
                name: 'Container Cup: 2 oz',
                quantity: 6,
                unit: 'Box 100'
              },
          ]
        },
        {
          category: 'Cleaning',
          items: [
              {
                name: 'Bleach',
                quantity: 5,
                unit: 'Box 100'
              },
              {
                name: 'Bounty Paper',
                quantity: 9,
                unit: 'Box 100'
              },
              {
                name: 'Center Pull Paper Towel',
                quantity: 7,
                unit: 'Box 100'
              },
              {
                name: 'Detergent: Dishes',
                quantity: 9,
                unit: 'Box 100'
              },
              {
                name: 'Décor Towels',
                quantity: 3,
                unit: 'Box 100'
              },
              {
                name: 'Film Paper',
                quantity: 13,
                unit: 'Box 100'
              },
              {
                name: 'Floor Cleaner',
                quantity: 9,
                unit: 'Box 100'
              },
              {
                name: 'Glass Cleaner (Easy-off)',
                quantity: 10,
                unit: 'Box 100'
              },
              {
                name: 'Glove: Oven',
                quantity: 0,
                unit: 'Box 100'
              },
              {
                name: 'Gloves Vinyl: Large',
                quantity: 8,
                unit: 'Box 100'
              },
              {
                name: 'Gloves Vinyl: Medium',
                quantity: 12,
                unit: 'Box 100'
              },
              {
                name: 'Hand Soap',
                quantity: 10,
                unit: 'Box 100'
              },
          ]
        }
      ],
    },
    {
      createdDate: 1618990994195,
      id: 'e639e921-65f9-41db-9c2f-736ef40316d1',
      store: 'La Grange',
      user: 'Torres Gonzalo',
      products: [
        {
          category: 'Empanadas',
          items: [
            {
              name: 'Meet',
              quantity: 5
            },
            {
              name: 'Chicken',
              quantity: 9
            },
            {
              name: 'BBQ Pork',
              quantity: 7
            },
            {
              name: 'Sausage',
              quantity: 9
            },
            {
              name: 'Ham & Cheese',
              quantity: 3
            },
            {
              name: 'Tuna',
              quantity: 13
            },
            {
              name: 'Bacon',
              quantity: 9
            },
            {
              name: 'Caprese',
              quantity: 10
            },
            {
              name: 'Spinach',
              quantity: 0
            },
            {
              name: 'Mushroom',
              quantity: 8
            },
            {
              name: 'Corn',
              quantity: 12
            },
            {
              name: 'Onion',
              quantity: 10
            },
            {
              name: 'Broccoli',
              quantity: 1
            },
            {
              name: 'Apple',
              quantity: 8
            },
            {
              name: 'Banana',
              quantity: 3
            },
            {
              name: 'Pepperoni',
              quantity: 11
            },
            {
              name: 'Buffalo Chick',
              quantity: 9
            },
            {
              name: '4 Cheese',
              quantity: 1
            },
            {
              name: 'Spin',
              quantity: 0
            },
            {
              name: 'Potato',
              quantity: 0
            },
            {
              name: 'Soy',
              quantity: 6
            },
            
          ]
        },
        {
          category: 'Gelato',
          items: [
            {
              name: 'Swiss Chocolate',
              quantity: 8
            },
            {
              name: 'Cappuccino Dark ',
              quantity: 9
            },
            {
              name: 'Chocolate Almond Fudge',
              quantity: 13
            },
            {
              name: 'White Chocolate Raspberry',
              quantity: 7
            },
            {
              name: 'French Vanilla',
              quantity: 0
            },
            {
              name: 'Banana Walnut',
              quantity: 5
            },
            {
              name: 'Creme de menthe ',
              quantity: 4
            },
            {
              name: 'Fresh Strawberry',
              quantity: 12
            },
            {
              name: 'Italian Pistachio',
              quantity: 7
            },
            {
              name: 'Fresh Mango ',
              quantity: 8
            },
            {
              name: 'Fresh Coconut',
              quantity: 4
            },
            {
              name: 'Wildberry ',
              quantity: 0
            },
          ]
        },
        {
          category: 'Others',
          items: [
            {
              name: 'Toro Espresso Decaf',
              quantity: 14
            },
            {
              name: 'Toro Espresso',
              quantity: 11
            },
            {
              name: 'Lavazza Caffe Macinato',
              quantity: 5
            },
            {
              name: 'Water',
              quantity: 1
            },
          ]
        }
      ],
      produces: [
        {
          name: 'Ground beef',
          quantity: 2,
          unit: 'st'
        },
        {
          name: 'Pork loin',
          quantity: 7,
          unit: 'st'
        },
        {
          name: 'Bacon',
          quantity: 3,
          unit: 'st'
        },
        {
          name: 'Sausage',
          quantity: 1,
          unit: 'st'
        },
        {
          name: 'Pepperoni',
          quantity: 4,
          unit: 'st'
        },
        {
          name: 'Tuna',
          quantity: 10,
          unit: 'st'
        },
      ],
      utilities: [
        {
          category: 'For Food',
          items: [
              {
                name: 'Pizza Box 12in',
                quantity: 4,
                unit: 'Box 100'
              },
              {
                name: 'Pizza Box 14in',
                quantity: 3,
                unit: 'Box 100'
              },
              {
                name: 'Pizza Box Wax Paper 12in',
                quantity: 0,
                unit: 'Box 100'
              },
              {
                name: 'Pizza Box Wax Paper: 14in',
                quantity: 5,
                unit: 'Box 100'
              },
              {
                name: 'Forks',
                quantity: 0,
                unit: 'Box 100'
              },
              {
                name: 'Knives',
                quantity: 5,
                unit: 'Box 100'
              },
              {
                name: 'Soup Spoons',
                quantity: 6,
                unit: 'Box 100'
              },
              {
                name: 'Spoons',
                quantity: 7,
                unit: 'Box 100'
              },
              {
                name: 'Straws',
                quantity: 13,
                unit: 'Box 100'
              },
              {
                name: 'Wood Stirrers',
                quantity: 9,
                unit: 'Box 100'
              },
              {
                name: 'Container Cup: 1 oz',
                quantity: 5,
                unit: 'Box 100'
              },
              {
                name: 'Container Cup: 2 oz',
                quantity: 9,
                unit: 'Box 100'
              },
          ]
        },
        {
          category: 'Cleaning',
          items: [
              {
                name: 'Bleach',
                quantity: 13,
                unit: 'Box 100'
              },
              {
                name: 'Bounty Paper',
                quantity: 9,
                unit: 'Box 100'
              },
              {
                name: 'Center Pull Paper Towel',
                quantity: 5,
                unit: 'Box 100'
              },
              {
                name: 'Detergent: Dishes',
                quantity: 9,
                unit: 'Box 100'
              },
              {
                name: 'Décor Towels',
                quantity: 8,
                unit: 'Box 100'
              },
              {
                name: 'Film Paper',
                quantity: 11,
                unit: 'Box 100'
              },
              {
                name: 'Floor Cleaner',
                quantity: 5,
                unit: 'Box 100'
              },
              {
                name: 'Glass Cleaner (Easy-off)',
                quantity: 7,
                unit: 'Box 100'
              },
              {
                name: 'Glove: Oven',
                quantity: 8,
                unit: 'Box 100'
              },
              {
                name: 'Gloves Vinyl: Large',
                quantity: 1,
                unit: 'Box 100'
              },
              {
                name: 'Gloves Vinyl: Medium',
                quantity: 12,
                unit: 'Box 100'
              },
              {
                name: 'Hand Soap',
                quantity: 1,
                unit: 'Box 100'
              },
          ]
        }
      ],
    },
    {
      createdDate: 1618990994195,
      id: '2f1c3f32-3d1b-44da-b66b-11201199bf63',
      store: 'Homewood',
      user: 'Silva Gaston',
      products: [
        {
          category: 'Empanadas',
          items: [
            {
              name: 'Meet',
              quantity: 3
            },
            {
              name: 'Chicken',
              quantity: 2
            },
            {
              name: 'BBQ Pork',
              quantity: 12
            },
            {
              name: 'Sausage',
              quantity: 7
            },
            {
              name: 'Ham & Cheese',
              quantity: 3
            },
            {
              name: 'Tuna',
              quantity: 6
            },
            {
              name: 'Bacon',
              quantity: 10
            },
            {
              name: 'Caprese',
              quantity: 4
            },
            {
              name: 'Spinach',
              quantity: 0
            },
            {
              name: 'Mushroom',
              quantity: 10
            },
            {
              name: 'Corn',
              quantity: 11
            },
            {
              name: 'Onion',
              quantity: 7
            },
            {
              name: 'Broccoli',
              quantity: 12
            },
            {
              name: 'Apple',
              quantity: 12
            },
            {
              name: 'Banana',
              quantity: 8
            },
            {
              name: 'Pepperoni',
              quantity: 12
            },
            {
              name: 'Buffalo Chick',
              quantity: 11
            },
            {
              name: '4 Cheese',
              quantity: 13
            },
            {
              name: 'Spin',
              quantity: 7
            },
            {
              name: 'Potato',
              quantity: 12
            },
            {
              name: 'Soy',
              quantity: 5
            },
            
          ]
        },
        {
          category: 'Gelato',
          items: [
            {
              name: 'Swiss Chocolate',
              quantity: 11
            },
            {
              name: 'Cappuccino Dark ',
              quantity: 5
            },
            {
              name: 'Chocolate Almond Fudge',
              quantity: 13
            },
            {
              name: 'White Chocolate Raspberry',
              quantity: 0
            },
            {
              name: 'French Vanilla',
              quantity: 4
            },
            {
              name: 'Banana Walnut',
              quantity: 7
            },
            {
              name: 'Creme de menthe ',
              quantity: 11
            },
            {
              name: 'Fresh Strawberry',
              quantity: 4
            },
            {
              name: 'Italian Pistachio',
              quantity: 2
            },
            {
              name: 'Fresh Mango ',
              quantity: 0
            },
            {
              name: 'Fresh Coconut',
              quantity: 0
            },
            {
              name: 'Wildberry ',
              quantity: 14
            },
          ]
        },
        {
          category: 'Others',
          items: [
            {
              name: 'Toro Espresso Decaf',
              quantity: 1
            },
            {
              name: 'Toro Espresso',
              quantity: 10
            },
            {
              name: 'Lavazza Caffe Macinato',
              quantity: 5
            },
            {
              name: 'Water',
              quantity: 4
            },
          ]
        }
      ],
      produces: [
        {
          name: 'Ground beef',
          quantity: 5,
          unit: 'st'
        },
        {
          name: 'Pork loin',
          quantity: 3,
          unit: 'st'
        },
        {
          name: 'Bacon',
          quantity: 14,
          unit: 'st'
        },
        {
          name: 'Sausage',
          quantity: 11,
          unit: 'st'
        },
        {
          name: 'Pepperoni',
          quantity: 0,
          unit: 'st'
        },
        {
          name: 'Tuna',
          quantity: 13,
          unit: 'st'
        },
      ],
      utilities: [
        {
          category: 'For Food',
          items: [
              {
                name: 'Pizza Box 12in',
                quantity: 0,
                unit: 'Box 100'
              },
              {
                name: 'Pizza Box 14in',
                quantity: 7,
                unit: 'Box 100'
              },
              {
                name: 'Pizza Box Wax Paper 12in',
                quantity: 12,
                unit: 'Box 100'
              },
              {
                name: 'Pizza Box Wax Paper: 14in',
                quantity: 13,
                unit: 'Box 100'
              },
              {
                name: 'Forks',
                quantity: 12,
                unit: 'Box 100'
              },
              {
                name: 'Knives',
                quantity: 10,
                unit: 'Box 100'
              },
              {
                name: 'Soup Spoons',
                quantity: 10,
                unit: 'Box 100'
              },
              {
                name: 'Spoons',
                quantity: 4,
                unit: 'Box 100'
              },
              {
                name: 'Straws',
                quantity: 12,
                unit: 'Box 100'
              },
              {
                name: 'Wood Stirrers',
                quantity: 7,
                unit: 'Box 100'
              },
              {
                name: 'Container Cup: 1 oz',
                quantity: 2,
                unit: 'Box 100'
              },
              {
                name: 'Container Cup: 2 oz',
                quantity: 9,
                unit: 'Box 100'
              },
          ]
        },
        {
          category: 'Cleaning',
          items: [
              {
                name: 'Bleach',
                quantity: 12,
                unit: 'Box 100'
              },
              {
                name: 'Bounty Paper',
                quantity: 8,
                unit: 'Box 100'
              },
              {
                name: 'Center Pull Paper Towel',
                quantity: 6,
                unit: 'Box 100'
              },
              {
                name: 'Detergent: Dishes',
                quantity: 2,
                unit: 'Box 100'
              },
              {
                name: 'Décor Towels',
                quantity: 6,
                unit: 'Box 100'
              },
              {
                name: 'Film Paper',
                quantity: 10,
                unit: 'Box 100'
              },
              {
                name: 'Floor Cleaner',
                quantity: 4,
                unit: 'Box 100'
              },
              {
                name: 'Glass Cleaner (Easy-off)',
                quantity: 9,
                unit: 'Box 100'
              },
              {
                name: 'Glove: Oven',
                quantity: 14,
                unit: 'Box 100'
              },
              {
                name: 'Gloves Vinyl: Large',
                quantity: 12,
                unit: 'Box 100'
              },
              {
                name: 'Gloves Vinyl: Medium',
                quantity: 13,
                unit: 'Box 100'
              },
              {
                name: 'Hand Soap',
                quantity: 2,
                unit: 'Box 100'
              },
          ]
        }
      ],
    },
  ]

  constructor(private afs: AngularFirestore) { 
    this.setCollections();
  }

  private setCollections(): void {
    this.weeklyInventoryCollection = this.afs.collection<any>('weeklyInventories',inv => inv.orderBy('createdDate','desc').orderBy('store','desc').limit(1));
    this.dailyInventoryCollection = this.afs.collection<any>('dailyInventories',inv => inv.orderBy('createdDate','desc').limit(1));
    this.weeklyInventoryStructureCollection = this.afs.collection<any>('weeklyinventoryStructure', is => is.orderBy('dateUpdated','desc').limit(1))
    this.dailyInventoryStructureCollection = this.afs.collection<any>('dailyinventoryStructure', is => is.orderBy('dateUpdated','desc').limit(1))
  }

  getStores(): Observable<StoreViewModel[]> {
    const storeListObservable$ = of(this.storeList);
    return storeListObservable$;
  }

  getWeeklyStructure(): Observable<InventoryStructure> {
    // return of(this.constInventoryStructure);
    this.weeklyInventoryStructure = this.weeklyInventoryStructureCollection.valueChanges();
    return this.weeklyInventoryStructure.pipe( map( data => data[0]));
  }
  
  getDailyStructure(): Observable<InventoryStructure> {
    // return of(this.constDailyInventoryStructure);
    this.dailyInventoryStructure = this.dailyInventoryStructureCollection.valueChanges();
    return this.dailyInventoryStructure.pipe( map( data => data[0]));
  }

  async updateWeekStructure(inventoryStructure: InventoryStructure) {
    const dbInventoryStructure: DBInventoryStructure = {
      ...inventoryStructure,
      dateUpdated: Date.now(),
      userUpdated: 'System'
    }
    return this.weeklyInventoryStructureCollection.add(dbInventoryStructure)
  }

  async updateDailyStructure(inventoryStructure: InventoryStructure) {
    const dbInventoryStructure: DBInventoryStructure = {
      ...inventoryStructure,
      dateUpdated: Date.now(),
      userUpdated: 'System'
    }
    return this.dailyInventoryStructureCollection.add(dbInventoryStructure)
  }

  getInventorys(): Observable<InventoryViewModel[]>{
    const inventoryListObservable$ = of(this.inventoryLists);
    return inventoryListObservable$;
  }

  getLastInventories(): Observable<InventoryViewModel[]>[] {
    const asd = this.storesAbr.map( ab =>  this.afs.collection<any>('inventories',inv => inv.orderBy('createdDate','desc').where('store','==', ab).limit(1)).valueChanges())
    return asd;
      // this.inventories = this.inventoryCollection.valueChanges();
      // return this.inventories;
  }

  async setNewWeeklyInventory(inventory: InventoryViewModel ) {
    inventory.user = 'System'
    inventory.createdDate = Date.now();
    return this.weeklyInventoryCollection.add(inventory);
  }

  async setNewDailyInventory(inventory: InventoryViewModel ) {
    inventory.user = 'System'
    inventory.createdDate = Date.now();
    return this.dailyInventoryCollection.add(inventory);
  }

}
