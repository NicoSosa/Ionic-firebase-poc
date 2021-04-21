import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryProductViewModel } from '../models/products/categorys/categoryProductView.model';
import { FlavourProductViewModel } from '../models/products/flavours/flavourProductView.model';
import { ProductViewModel } from '../models/products/productView.model';
import { ProductListViewModel } from '../models/products/productListView.model';
import { StoreViewModel } from '../models/stores/storeView.model';
import { CategoryUtilitiesViewModel } from '../models/utilities/categories/categoryUtilitiesView.model';
import { UtilityViewModel } from '../models/utilities/utilityView.model';
import { UtilityListViewModel } from '../models/utilities/utilityListView.model';
import { InventoryViewModel } from '../models/inventories/inventoryView.Model';
import { InventoryStructure } from '../models/inventories/inventoryStructure.model';

@Injectable({
  providedIn: 'root'
})
export class DbRequestsService {
  private categoriesProduct: CategoryProductViewModel[] = [
    {
      id: 'd3501fb2-69b0-4f74-a1a8-fbe7ef6c04a1',
      name: 'Empanadas'
    }, 
    {
      id: 'b0bd26ff-8719-4a5d-b013-9330d0b47044',
      name: 'Gelato'
    }, 
    {
      id: '75d3378f-4530-4baa-ae27-262e25eef05f',
      name: 'Beverages'
    },
  ]

  private flavoursProduct: FlavourProductViewModel[] = [
    {
      id: '7ec7fac6-896f-4117-a47b-2c51c3fc8b5d',
      name: 'Beef',
      category: this.categoriesProduct[0],
    },
    {
      id: '7ec7fac6-896f-4117-a47b-2c51c3fc8b5d',
      name: 'Chicken',
      category: this.categoriesProduct[0],
    },
    {
      id: '9e12ba15-7b4d-4ce2-8884-4fc89c0709cf',
      name: 'Tuna',
      category: this.categoriesProduct[0],
    },
    {
      id: '261743aa-965a-4fe1-a69e-75c546147880',
      name: 'French Vanilla',
      category: this.categoriesProduct[1],
    },
    {
      id: '7d47682d-dabc-45b7-aae2-494e3177b167',
      name: 'Banana Walnut',
      category: this.categoriesProduct[1],
    },
    {
      id: 'cce03f5d-ef1e-4ea9-ac34-aafb70949e25',
      name: 'Fresh Coconout',
      category: this.categoriesProduct[1],
    },

  ]

  private products: ProductViewModel[] = [
    {
      id: '47a52457-e279-42d6-b0f8-b59ffabe09b6',
      name: `${this.flavoursProduct[0].name}`,
      flavour: this.flavoursProduct[0],
    },
    {
      id: '180082d4-232e-4594-9060-5dcd67e43fc9',
      name: `${this.flavoursProduct[1].name}`,
      flavour: this.flavoursProduct[1],
    },
    {
      id: 'b20428aa-c851-4994-8600-9e1316256917',
      name: `${this.flavoursProduct[2].name}`,
      flavour: this.flavoursProduct[2],
    },
    {
      id: '864315c2-a3b8-4da8-a5ea-dd1b10687bf9',
      name: `${this.flavoursProduct[3].name}`,
      flavour: this.flavoursProduct[3],
    },
    {
      id: '9f8237fb-01b4-4489-8a93-9e8a6e7140d1',
      name: `${this.flavoursProduct[4].name}`,
      flavour: this.flavoursProduct[4],
    },
    {
      id: '4755b398-936d-41a9-b4a8-551aa90f0f60',
      name: `${this.flavoursProduct[5].name}`,
      flavour: this.flavoursProduct[5],
    },
    {
      id: '8ef4bcf9-7fb6-4ea1-94aa-2b25c9661e51',
      name: 'Colectivo Toro Espreso Decaf',
    },
    {
      id: 'c3f4e806-f5c2-4de2-86d4-c8d7e6219dc6',
      name: 'Lavazza Caffe Macinato',
    },
  ]

  private productsList: ProductListViewModel[] = [
    {
      category: this.categoriesProduct[0],
      products: [
        this.products[0],
        this.products[1],
        this.products[2],
      ]
    },
    {
      category: this.categoriesProduct[1],
      products: [
        this.products[3],
        this.products[4],
        this.products[5],
      ]
    },
    {
      category: this.categoriesProduct[2],
      products: [
        this.products[6],
        this.products[7],
      ]
    },
  ]

  private categoriesUtility: CategoryUtilitiesViewModel[] = [
    {
      id: 'acc0856d-7100-462f-8866-20b8bbf8d7b0',
      name: 'For Food'
    },
    {
      id: 'dfa836f5-a62d-4529-9c75-b3d4aaf14322',
      name: 'Cleaning'
    }
  ]

  private utilities: UtilityViewModel[] = [
    {
      id: '6300eacc-8bb8-441d-9e79-32c9011ae7d4',
      name: 'Aluminum Paper (12x500)',
      unit: 'Box (12 unit)'
    },
    {
      id: '6541f0ab-8e14-4454-bcbe-49abe6f98d9e',
      name: 'Bags Thank you',
      unit: 'unit'
    },
    {
      id: '24ab35c3-53f7-419b-be0c-5ba796f56d7f',
      name: 'Film Paper',
      unit: 'unit'
    },
    {
      id: 'b4571778-f28b-4514-ad0e-dfacefd712b8',
      name: 'Coffe filters',
      unit: 'unit'
    },
    {
      id: '907fa6ea-6633-47e1-bbd3-8cd4f10d35f2',
      name: 'Container Gelato Mini',
      unit: 'unit'
    },
    {
      id: '15fe9109-cda4-4195-9da7-9a72e06ee450',
      name: 'Pizza Box: 12 ',
      unit: 'unit'
    },
  ]

  private utilitiesList: UtilityListViewModel[] = [
    {
      category: this.categoriesUtility[1],
      utilities: [
        this.utilities[3],
        this.utilities[4],
        this.utilities[5],
      ]
    },
    {
      category: this.categoriesUtility[0],
      utilities: [
        this.utilities[0],
        this.utilities[1],
        this.utilities[2],
      ]
    },
  ]

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
      createdDate: 'Apr/01/2021 10:31',
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
      createdDate: 'Apr/01/2021 10:49',
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
      createdDate: 'Apr/02/2021 15:42',
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

  private inventoryStructure: InventoryStructure = {
    pages: [{
      name: 'products',
      categories: [
      {
        category: 'Empanadas',
        items: [
          {
            id: '60994966-f6f1-4d80-b93a-12a887e59ad1',
            name: 'Meet',
            showName: 'Meet',
            unit: 'container'
          },
          {
            id: 'c4da461a-c9ea-4285-8c7e-38f7187d090e',
            name: 'Chicken',
            showName: 'Chicken',
            unit: 'container'
          },
          {
            id: 'af673743-4e1a-49ef-84e4-b8b0d0810e37',
            name: 'BBQ Pork',
            showName: 'BBQ Pork',
            unit: 'container'
          },
          {
            id: '58ed079e-5592-4ccb-8a6d-9445886b74d6',
            name: 'Sausage',
            showName: 'Sausage',
            unit: 'container'
          },
          {
            id: '65ad6b1f-4506-4b4c-aa2d-aa0272d6311f',
            name: 'Ham & Cheese',
            showName: 'Ham & Cheese',
            unit: 'container'
          },
          {
            id: '03780a3e-0b0f-4013-8466-99700483d780',
            name: 'Tuna',
            showName: 'Tuna',
            unit: 'container'
          },
          {
            id: '5449267c-f513-4ebf-942f-898a77e2e1c7',
            name: 'Bacon',
            showName: 'Bacon',
            unit: 'container'
          },
          {
            id: '8bfa9e10-d53b-436a-9786-1fdd59228e79',
            name: 'Caprese',
            showName: 'Caprese',
            unit: 'container'
          },
          {
            id: 'f10241c4-449f-445f-a412-fd3e52315e26',
            name: 'Spinach',
            showName: 'Spinach',
            unit: 'container'
          },
          {
            id: '5d5bb03f-7353-4dfb-bb5b-4dcebd9578fb',
            name: 'Mushroom',
            showName: 'Mushroom',
            unit: 'container'
          },
          {
            id: '015d7af2-bf79-43fb-a6fa-6efb74532b8b',
            name: 'Corn',
            showName: 'Corn',
            unit: 'container'
          },
          {
            id: '791a1d74-d244-4095-80ae-1d56d3108a51',
            name: 'Onion',
            showName: 'Onion',
            unit: 'container'
          },
          {
            id: '61c5511d-32e8-4fdb-9b1e-113b1ad2da30',
            name: 'Broccoli',
            showName: 'Broccoli',
            unit: 'container'
          },
          {
            id: '3660c9d0-561c-4416-ad93-c5f280902232',
            name: 'Apple',
            showName: 'Apple',
            unit: 'container'
          },
          {
            id: 'a32df6ce-7433-4827-b14c-fdc5242bdfda',
            name: 'Banana',
            showName: 'Banana',
            unit: 'container'
          },
          {
            id: '5e182117-72d3-4b38-965d-26aa3fe4f87c',
            name: 'Pepperoni',
            showName: 'Pepperoni',
            unit: 'container'
          },
          {
            id: 'ed587252-660b-479c-8825-20b63d980b15',
            name: 'Buffalo Chick',
            showName: 'Buffalo Chick',
            unit: 'container'
          },
          {
            id: '5aa56503-6322-4c43-821a-648b443dd2fc',
            name: '4 Cheese',
            showName: '4 Cheese',
            unit: 'container'
          },
          {
            id: '2e2e8f0b-9932-4526-a3dc-567d718d9c8e',
            name: 'Spin',
            showName: 'Spin',
            unit: 'container'
          },
          {
            id: '5742fdcf-d72a-42b8-ab09-bca41fb7bc08',
            name: 'Potato',
            showName: 'Potato',
            unit: 'container'
          },
          {
            id: '375ddfa0-cdc0-45e2-a202-69edc3859ea7',
            name: 'Soy',
            showName: 'Soy',
            unit: 'container'
          },
          
        ]
      },
      {
        category: 'Gelato',
        items: [
          {
            id: '426e7d57-219c-439b-a356-d2c68b7e31a2',
            name: 'Swiss Chocolate',
            showName: 'Swiss Chocolate',
            unit: 'container'
          },
          {
            id: '9c4d6127-c3a5-4106-a6e2-3dfb6a2d31ed',
            name: 'Cappuccino Dark ',
            showName: 'Cappuccino Dark ',
            unit: 'container'
          },
          {
            id: '85439bf7-27a0-47af-9668-b0864e99725e',
            name: 'Chocolate Almond Fudge',
            showName: 'Chocolate Almond Fudge',
            unit: 'container'
          },
          {
            id: '0e39eca5-91b9-41ee-ae0c-770d817daa19',
            name: 'White Chocolate Raspberry',
            showName: 'White Chocolate Raspberry',
            unit: 'container'
          },
          {
            id: '91f56fce-5aaf-4902-8622-71e079c4f76f',
            name: 'French Vanilla',
            showName: 'French Vanilla',
            unit: 'container'
          },
          {
            id: '3ac642e8-458f-4078-aedb-42039ed2c537',
            name: 'Banana Walnut',
            showName: 'Banana Walnut',
            unit: 'container'
          },
          {
            id: 'ca9abfed-3c0f-4c4b-94f9-f00f8feef0a0',
            name: 'Creme de menthe ',
            showName: 'Creme de menthe ',
            unit: 'container'
          },
          {
            id: 'f84c1e1f-c10c-4fec-b63b-37bbf1ca0754',
            name: 'Fresh Strawberry',
            showName: 'Fresh Strawberry',
            unit: 'container'
          },
          {
            id: '6a1de402-8259-4a94-ad56-c08e1143d82d',
            name: 'Italian Pistachio',
            showName: 'Italian Pistachio',
            unit: 'container'
          },
          {
            id: 'd0c5a740-5f87-4958-b0b3-9c42c48d0a87',
            name: 'Fresh Mango ',
            showName: 'Fresh Mango ',
            unit: 'container'
          },
          {
            id: '5a115a47-bf04-43f2-92bf-085f2034afaa',
            name: 'Fresh Coconut',
            showName: 'Fresh Coconut',
            unit: 'container'
          },
          {
            id: '30895dbb-42ad-47c6-8d9a-967caf5392b4',
            name: 'Wildberry ',
            showName: 'Wildberry ',
            unit: 'container'
          },
        ]
      },
      {
        category: 'Others',
        items: [
          {
            id: '9fa70d35-1f06-4b85-8ac6-d8a3e67f3a28',
            name: 'Toro Espresso Decaf',
            showName: 'Toro Espresso Decaf',
            unit: 'container'
          },
          {
            id: '5a210e29-e1ae-41aa-8121-d82ce484d374',
            name: 'Toro Espresso',
            showName: 'Toro Espresso',
            unit: 'container'
          },
          {
            id: '56a7389c-c555-4ad1-99dd-baef7937665b',
            name: 'Lavazza Caffe Macinato',
            showName: 'Lavazza Caffe Macinato',
            unit: 'container'
          },
          {
            id: 'd71b8f98-cfe9-4311-a4c7-a1cf48e90188',
            name: 'Water',
            showName: 'Water',
            unit: 'container'
          },
        ]
      }
      ]
    },
    {
      name: 'Raw materials',
      categories: [
          {
              category: 'Raw materials',
              items: [
                  {
                  id: 'f7f1c7e7-409b-47e4-a7e6-fa408001396a',
                  name: 'Ground beef',
                  showName: 'Ground beef',
                  unit: 'st'
                  },
                  {
                  id: 'b325efbe-0109-4ab4-8257-946e1d5500f9',
                  name: 'Pork loin',
                  showName: 'Pork loin',
                  unit: 'st'
                  },
                  {
                  id: '53906b26-fa80-4f9d-967b-57482096ae64',
                  name: 'Bacon',
                  showName: 'Bacon',
                  unit: 'st'
                  },
                  {
                  id: '0880c0ea-f444-42ca-9929-bb331d66c025',
                  name: 'Sausage',
                  showName: 'Sausage',
                  unit: 'st'
                  },
                  {
                  id: 'dc64517a-7322-453d-a3ea-04d605e84066',
                  name: 'Pepperoni',
                  showName: 'Pepperoni',
                  unit: 'st'
                  },
                  {
                  id: 'a6e6047e-6db8-477e-bfe5-d674b92b2417',
                  name: 'Tuna',
                  showName: 'Tuna',
                  unit: 'st'
                  },
              ],
          }
      ]
    },
    {
      name: 'utilities',
      categories: [
          {
          category: 'For Food',
          items: [
              {
                id: '1de48df3-a423-4a91-8920-bbd19e3018a4',
                name: 'Pizza Box 12in',
                showName: 'Pizza Box 12in',
                unit: 'Box 100'
              },
              {
                id: '373560bc-5686-46c2-b874-54f413b214c6',
                name: 'Pizza Box 14in',
                showName: 'Pizza Box 14in',
                unit: 'Box 100'
              },
              {
                id: 'e170a7fe-2fa0-4137-8510-450199771d36',
                name: 'Pizza Box Wax Paper 12in',
                showName: 'Pizza Box Wax Paper 12in',
                unit: 'Box 100'
              },
              {
                id: 'ee1158e1-aaf3-409b-865c-af2ca3a4ff19',
                name: 'Pizza Box Wax Paper: 14in',
                showName: 'Pizza Box Wax Paper: 14in',
                unit: 'Box 100'
              },
              {
                id: '4a0c703f-f129-4fa8-8ad5-81493ea2c045',
                name: 'Forks',
                showName: 'Forks',
                unit: 'Box 100'
              },
              {
                id: 'e343e2bf-9196-49f1-852c-f1a3d1db882d',
                name: 'Knives',
                showName: 'Knives',
                unit: 'Box 100'
              },
              {
                id: 'faa6e342-9f72-4dc5-a71c-d647de50c8b5',
                name: 'Soup Spoons',
                showName: 'Soup Spoons',
                unit: 'Box 100'
              },
              {
                id: '1786f294-bbb6-4eb4-8b21-493ae8bb6557',
                name: 'Spoons',
                showName: 'Spoons',
                unit: 'Box 100'
              },
              {
                id: 'e110e672-a341-4abf-9514-da6471ff3c49',
                name: 'Straws',
                showName: 'Straws',
                unit: 'Box 100'
              },
              {
                id: '79da8302-2706-4256-946b-919bc5871dcc',
                name: 'Wood Stirrers',
                showName: 'Wood Stirrers',
                unit: 'Box 100'
              },
              {
                id: 'cc5ddd8a-958e-4e1f-967e-65e450c0a8d7',
                name: 'Container Cup: 1 oz',
                showName: 'Container Cup: 1 oz',
                unit: 'Box 100'
              },
              {
                id: '62ef7f6c-8762-47b9-bc5c-cd7bd0deffd6',
                name: 'Container Cup: 2 oz',
                showName: 'Container Cup: 2 oz',
                unit: 'Box 100'
              },
          ]
          },
          {
          category: 'Cleaning',
          items: [
              {
                id: 'd4616157-0a6d-4aa8-894e-aa472bd092c3',
                name: 'Bleach',
                showName: 'Bleach',
                unit: 'Box 100'
              },
              {
                id: '29b17d4a-9790-42ea-87ce-dd434250528b',
                name: 'Bounty Paper',
                showName: 'Bounty Paper',
                unit: 'Box 100'
              },
              {
                id: 'eb358b13-42ac-4ebb-bce7-04b481ae12b4',
                name: 'Center Pull Paper Towel',
                showName: 'Center Pull Paper Towel',
                unit: 'Box 100'
              },
              {
                id: 'fc399490-810d-4bf9-ad08-b2ad8a0eee2d',
                name: 'Detergent: Dishes',
                showName: 'Detergent: Dishes',
                unit: 'Box 100'
              },
              {
                id: 'f61d349c-d733-4c48-a1d3-9465aa3fbbb5',
                name: 'Décor Towels',
                showName: 'Décor Towels',
                unit: 'Box 100'
              },
              {
                id: 'b26e3fab-5917-436c-8315-d4b7951aefb8',
                name: 'Film Paper',
                showName: 'Film Paper',
                unit: 'Box 100'
              },
              {
                id: '4209dab5-c2f0-4ef1-ba77-42572dda697e',
                name: 'Floor Cleaner',
                showName: 'Floor Cleaner',
                unit: 'Box 100'
              },
              {
                id: 'dfced4f0-4e3f-4044-8071-5a95de8c1ff1',
                name: 'Glass Cleaner (Easy-off)',
                showName: 'Glass Cleaner (Easy-off)',
                unit: 'Box 100'
              },
              {
                id: 'fd3058cb-0d1e-4d92-b975-184c3f350477',
                name: 'Glove: Oven',
                showName: 'Glove: Oven',
                unit: 'Box 100'
              },
              {
                id: 'cf554d81-17e1-4a11-8200-988f11e16530',
                name: 'Gloves Vinyl: Large',
                showName: 'Gloves Vinyl: Large',
                unit: 'Box 100'
              },
              {
                id: 'c701ca28-6a7f-4217-8307-b53d3150835b',
                name: 'Gloves Vinyl: Medium',
                showName: 'Gloves Vinyl: Medium',
                unit: 'Box 100'
              },
              {
                id: '7735f0c6-9899-47bc-a264-0216e325ef56',
                name: 'Hand Soap',
                showName: 'Hand Soap',
                unit: 'Box 100'
              },
          ]
          }
      ],
    }],
  };

  constructor() { }

  getProducts(): Observable<ProductListViewModel[]> {
    const productsListObservable$ = of(this.productsList);
    return productsListObservable$;
  }

  getUtilities(): Observable<UtilityListViewModel[]> {
    const utilitiesListObservable$ = of(this.utilitiesList);
    return utilitiesListObservable$;
  }

  getStores(): Observable<StoreViewModel[]> {
    const storeListObservable$ = of(this.storeList);
    return storeListObservable$;
  }

  getInventorys(): Observable<InventoryViewModel[]>{
    const inventoryListObservable$ = of(this.inventoryLists);
    return inventoryListObservable$;
  }

  getStructure(): Observable<InventoryStructure> {
    return new Observable(observer => {
      const inventoryStructureObservable$ = of(this.inventoryStructure);
      setTimeout(() => {
        observer.next(this.inventoryStructure);
      }, 500)
    })
  }
}
