import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptwiseCatalogingReportComponent } from './deptwise-cataloging-report.component';

describe('DeptwiseCatalogingReportComponent', () => {
  let component: DeptwiseCatalogingReportComponent;
  let fixture: ComponentFixture<DeptwiseCatalogingReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeptwiseCatalogingReportComponent]
    });
    fixture = TestBed.createComponent(DeptwiseCatalogingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
