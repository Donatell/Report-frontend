import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListsTableComponent } from './patient-lists-table.component';

describe('PatientListsTableComponent', () => {
  let component: PatientListsTableComponent;
  let fixture: ComponentFixture<PatientListsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientListsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientListsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
