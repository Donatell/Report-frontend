import { TestBed } from '@angular/core/testing';

import { PatientListsService } from './patient-lists.service';

describe('PatientListsService', () => {
  let service: PatientListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
