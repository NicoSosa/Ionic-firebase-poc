import { TestBed } from '@angular/core/testing';

import { InventoryLocalStorageService } from './inventory-local-storage.service';

describe('InventoryLocalStorageService', () => {
  let service: InventoryLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
