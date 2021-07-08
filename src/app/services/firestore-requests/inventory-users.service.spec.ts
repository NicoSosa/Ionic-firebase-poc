import { TestBed } from '@angular/core/testing';

import { InventoryUsersService } from './inventory-users.service';

describe('InventoryUsersService', () => {
  let service: InventoryUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
