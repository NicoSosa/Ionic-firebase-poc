import { TestBed } from '@angular/core/testing';

import { InventoryReportService } from './inventory-report.service';

describe('InventoryReportService', () => {
  let service: InventoryReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
