import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookIssueReportIsuetypeWiseComponent } from './book-issue-report-isuetype-wise.component';

describe('BookIssueReportIsuetypeWiseComponent', () => {
  let component: BookIssueReportIsuetypeWiseComponent;
  let fixture: ComponentFixture<BookIssueReportIsuetypeWiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookIssueReportIsuetypeWiseComponent]
    });
    fixture = TestBed.createComponent(BookIssueReportIsuetypeWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
