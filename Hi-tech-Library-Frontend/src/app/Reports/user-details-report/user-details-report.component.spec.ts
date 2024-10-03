import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsReportComponent } from './user-details-report.component';

describe('UserDetailsReportComponent', () => {
  let component: UserDetailsReportComponent;
  let fixture: ComponentFixture<UserDetailsReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailsReportComponent]
    });
    fixture = TestBed.createComponent(UserDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
