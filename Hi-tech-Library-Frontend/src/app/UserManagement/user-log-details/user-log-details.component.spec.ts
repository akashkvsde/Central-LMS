import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLogDetailsComponent } from './user-log-details.component';

describe('UserLogDetailsComponent', () => {
  let component: UserLogDetailsComponent;
  let fixture: ComponentFixture<UserLogDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLogDetailsComponent]
    });
    fixture = TestBed.createComponent(UserLogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
