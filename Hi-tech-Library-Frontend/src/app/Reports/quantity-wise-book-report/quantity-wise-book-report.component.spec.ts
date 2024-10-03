import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityWiseBookReportComponent } from './quantity-wise-book-report.component';

describe('QuantityWiseBookReportComponent', () => {
  let component: QuantityWiseBookReportComponent;
  let fixture: ComponentFixture<QuantityWiseBookReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuantityWiseBookReportComponent]
    });
    fixture = TestBed.createComponent(QuantityWiseBookReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
