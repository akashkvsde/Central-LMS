import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorsComponent } from './add-vendors.component';

describe('AddVendorsComponent', () => {
  let component: AddVendorsComponent;
  let fixture: ComponentFixture<AddVendorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVendorsComponent]
    });
    fixture = TestBed.createComponent(AddVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
