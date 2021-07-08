import { TestBed } from '@angular/core/testing';

import { InventoryStructureService } from './inventory-structure.service';

describe('InventoryStructureService', () => {
  let service: InventoryStructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryStructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
