import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryProductViewModel } from '../models/products/categorys/categoryProductView.model';
import { FlavourProductViewModel } from '../models/products/flavours/flavourProductView.model';
import { ProductViewModel } from '../models/products/productView.model';
import { ProductListViewModel } from '../models/products/productListView.model';
import { StoreViewModel } from '../models/stores/storeView.model';

@Injectable({
  providedIn: 'root'
})
export class DbRequestsService {
  private categorys: CategoryProductViewModel[] = [
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
      name: 'Others'
    },
  ]

  private flavours: FlavourProductViewModel[] = [
    {
      id: '7ec7fac6-896f-4117-a47b-2c51c3fc8b5d',
      name: 'Beef',
      category: this.categorys[0],
    },
    {
      id: '7ec7fac6-896f-4117-a47b-2c51c3fc8b5d',
      name: 'Chicken',
      category: this.categorys[0],
    },
    {
      id: '9e12ba15-7b4d-4ce2-8884-4fc89c0709cf',
      name: 'Tuna',
      category: this.categorys[0],
    },
    {
      id: '261743aa-965a-4fe1-a69e-75c546147880',
      name: 'French Vanilla',
      category: this.categorys[1],
    },
    {
      id: '7d47682d-dabc-45b7-aae2-494e3177b167',
      name: 'Banana Walnut',
      category: this.categorys[1],
    },
    {
      id: 'cce03f5d-ef1e-4ea9-ac34-aafb70949e25',
      name: 'Fresh Coconout',
      category: this.categorys[1],
    },

  ]

  private products: ProductViewModel[] = [
    {
      id: '47a52457-e279-42d6-b0f8-b59ffabe09b6',
      name: `${this.flavours[0].name}`,
      flavour: this.flavours[0],
    },
    {
      id: '180082d4-232e-4594-9060-5dcd67e43fc9',
      name: `${this.flavours[1].name}`,
      flavour: this.flavours[1],
    },
    {
      id: 'b20428aa-c851-4994-8600-9e1316256917',
      name: `${this.flavours[2].name}`,
      flavour: this.flavours[2],
    },
    {
      id: '864315c2-a3b8-4da8-a5ea-dd1b10687bf9',
      name: `${this.flavours[3].name}`,
      flavour: this.flavours[3],
    },
    {
      id: '9f8237fb-01b4-4489-8a93-9e8a6e7140d1',
      name: `${this.flavours[4].name}`,
      flavour: this.flavours[4],
    },
    {
      id: '4755b398-936d-41a9-b4a8-551aa90f0f60',
      name: `${this.flavours[5].name}`,
      flavour: this.flavours[5],
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
      category: this.categorys[0],
      products: [
        this.products[0],
        this.products[1],
        this.products[2],
      ]
    },
    {
      category: this.categorys[1],
      products: [
        this.products[3],
        this.products[4],
        this.products[5],
      ]
    },
    {
      category: this.categorys[2],
      products: [
        this.products[6],
        this.products[7],
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


  constructor() { }

  getProducts(): Observable<ProductListViewModel[]> {
    const productsListObservable$ = of(this.productsList);
    return productsListObservable$;
  }

  getStores(): Observable<StoreViewModel[]> {
    const storeListObservable$ = of(this.storeList);
    return storeListObservable$;
  }
}
