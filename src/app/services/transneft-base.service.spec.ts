import { TestBed } from '@angular/core/testing';

import { TransneftBaseService } from './transneft-base.service';

describe('TransneftBaseService', () => {
  let service: TransneftBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransneftBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
