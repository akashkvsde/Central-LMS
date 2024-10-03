import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTransactionReportComponent } from './book-transaction-report.component';

describe('BookTransactionReportComponent', () => {
  let component: BookTransactionReportComponent;
  let fixture: ComponentFixture<BookTransactionReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookTransactionReportComponent]
    });
    fixture = TestBed.createComponent(BookTransactionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
