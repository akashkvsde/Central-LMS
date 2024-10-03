import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStatusReportComponent } from './book-status-report.component';

describe('BookStatusReportComponent', () => {
  let component: BookStatusReportComponent;
  let fixture: ComponentFixture<BookStatusReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookStatusReportComponent]
    });
    fixture = TestBed.createComponent(BookStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
