import { TestBed } from '@angular/core/testing';

import { ColumnTitleService } from './column-title.service';

describe('ColumnTitleService', () => {
  let service: ColumnTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
