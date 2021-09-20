import { TestBed } from '@angular/core/testing';

import { TransneftPriceCategoryService } from './transneft-price-category.service';

describe('TransneftPriceCategoryService', () => {
  let service: TransneftPriceCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransneftPriceCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
