import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDepartmentwiseReportComponent } from './book-subjectwise-report.component';

describe('BookDepartmentwiseReportComponent', () => {
  let component: BookDepartmentwiseReportComponent;
  let fixture: ComponentFixture<BookDepartmentwiseReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookDepartmentwiseReportComponent],
    });
    fixture = TestBed.createComponent(BookDepartmentwiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
