import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeIssueBookReportComponent } from './college-issue-book-report.component';

describe('CollegeIssueBookReportComponent', () => {
  let component: CollegeIssueBookReportComponent;
  let fixture: ComponentFixture<CollegeIssueBookReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollegeIssueBookReportComponent]
    });
    fixture = TestBed.createComponent(CollegeIssueBookReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
