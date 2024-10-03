import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentalIssueBookReportComponent } from './departmental-issue-book-report.component';

describe('DepartmentalIssueBookReportComponent', () => {
  let component: DepartmentalIssueBookReportComponent;
  let fixture: ComponentFixture<DepartmentalIssueBookReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentalIssueBookReportComponent]
    });
    fixture = TestBed.createComponent(DepartmentalIssueBookReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
