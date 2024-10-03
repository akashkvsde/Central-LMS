import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIssueTypeComponent } from './add-issue-type.component';

describe('AddIssueTypeComponent', () => {
  let component: AddIssueTypeComponent;
  let fixture: ComponentFixture<AddIssueTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddIssueTypeComponent]
    });
    fixture = TestBed.createComponent(AddIssueTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
