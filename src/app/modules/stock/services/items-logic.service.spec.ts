import { TestBed } from '@angular/core/testing';

import { ItemsLogicService } from './items-logic.service';

describe('ItemsLogicService', () => {
  let service: ItemsLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
