import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFinePolicyComponent } from './add-fine-policy.component';

describe('AddFinePolicyComponent', () => {
  let component: AddFinePolicyComponent;
  let fixture: ComponentFixture<AddFinePolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFinePolicyComponent]
    });
    fixture = TestBed.createComponent(AddFinePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
