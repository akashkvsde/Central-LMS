import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListReportComponent } from './book-list-report.component';

describe('BookListReportComponent', () => {
  let component: BookListReportComponent;
  let fixture: ComponentFixture<BookListReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookListReportComponent]
    });
    fixture = TestBed.createComponent(BookListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
