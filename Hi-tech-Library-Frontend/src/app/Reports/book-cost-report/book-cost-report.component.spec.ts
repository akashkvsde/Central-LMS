import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCostReportComponent } from './book-cost-report.component';

describe('BookCostReportComponent', () => {
  let component: BookCostReportComponent;
  let fixture: ComponentFixture<BookCostReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCostReportComponent]
    });
    fixture = TestBed.createComponent(BookCostReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
