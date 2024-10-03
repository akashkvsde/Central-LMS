import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIssuePolicyComponent } from './add-issue-policy.component';

describe('AddIssuePolicyComponent', () => {
  let component: AddIssuePolicyComponent;
  let fixture: ComponentFixture<AddIssuePolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddIssuePolicyComponent]
    });
    fixture = TestBed.createComponent(AddIssuePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
