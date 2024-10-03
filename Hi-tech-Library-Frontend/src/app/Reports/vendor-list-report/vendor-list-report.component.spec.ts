import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorListReportComponent } from './vendor-list-report.component';

describe('VendorListReportComponent', () => {
  let component: VendorListReportComponent;
  let fixture: ComponentFixture<VendorListReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorListReportComponent]
    });
    fixture = TestBed.createComponent(VendorListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
