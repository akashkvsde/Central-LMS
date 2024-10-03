import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillDetailsComponent } from './add-bill-details.component';

describe('AddBillDetailsComponent', () => {
  let component: AddBillDetailsComponent;
  let fixture: ComponentFixture<AddBillDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBillDetailsComponent]
    });
    fixture = TestBed.createComponent(AddBillDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
