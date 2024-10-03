import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FineCollectionReportComponent } from './fine-collection-report.component';

describe('FineCollectionReportComponent', () => {
  let component: FineCollectionReportComponent;
  let fixture: ComponentFixture<FineCollectionReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FineCollectionReportComponent]
    });
    fixture = TestBed.createComponent(FineCollectionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
