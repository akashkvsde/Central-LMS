import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuthrizedSignatureComponent } from './add-authrized-signature.component';

describe('AddAuthrizedSignatureComponent', () => {
  let component: AddAuthrizedSignatureComponent;
  let fixture: ComponentFixture<AddAuthrizedSignatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAuthrizedSignatureComponent]
    });
    fixture = TestBed.createComponent(AddAuthrizedSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
