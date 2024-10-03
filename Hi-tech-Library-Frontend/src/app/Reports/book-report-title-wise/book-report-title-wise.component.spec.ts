import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReportTitleWiseComponent } from './book-report-title-wise.component';

describe('BookReportTitleWiseComponent', () => {
  let component: BookReportTitleWiseComponent;
  let fixture: ComponentFixture<BookReportTitleWiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookReportTitleWiseComponent]
    });
    fixture = TestBed.createComponent(BookReportTitleWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
