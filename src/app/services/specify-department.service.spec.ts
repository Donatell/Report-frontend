import { TestBed } from '@angular/core/testing';

import { SpecifyDepartmentService } from './specify-department.service';

describe('SpecifyDepartmentService', () => {
  let service: SpecifyDepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecifyDepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
