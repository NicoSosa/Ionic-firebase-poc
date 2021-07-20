import { TestBed } from '@angular/core/testing';

import { ManagInventoryFormService } from './manag-inventory-form.service';

describe('ManagInventoryFormService', () => {
  let service: ManagInventoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagInventoryFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
