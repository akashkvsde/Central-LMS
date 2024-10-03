import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualBooksReportComponent } from './individual-books-report.component';

describe('IndividualBooksReportComponent', () => {
  let component: IndividualBooksReportComponent;
  let fixture: ComponentFixture<IndividualBooksReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualBooksReportComponent]
    });
    fixture = TestBed.createComponent(IndividualBooksReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
