import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserwiseBookReportComponent } from './userwise-book-report.component';

describe('UserwiseBookReportComponent', () => {
  let component: UserwiseBookReportComponent;
  let fixture: ComponentFixture<UserwiseBookReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserwiseBookReportComponent]
    });
    fixture = TestBed.createComponent(UserwiseBookReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
