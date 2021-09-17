import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePatientListDialogComponent } from './delete-patient-list-dialog.component';

describe('DeletePatientListDialogComponent', () => {
  let component: DeletePatientListDialogComponent;
  let fixture: ComponentFixture<DeletePatientListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePatientListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePatientListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
