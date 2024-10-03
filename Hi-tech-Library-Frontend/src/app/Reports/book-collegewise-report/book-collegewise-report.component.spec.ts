import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCollegewiseReportComponent } from './book-collegewise-report.component';

describe('BookCollegewiseReportComponent', () => {
  let component: BookCollegewiseReportComponent;
  let fixture: ComponentFixture<BookCollegewiseReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCollegewiseReportComponent]
    });
    fixture = TestBed.createComponent(BookCollegewiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
