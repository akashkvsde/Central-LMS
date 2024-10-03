import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavManageComponent } from './nav-manage.component';

describe('NavManageComponent', () => {
  let component: NavManageComponent;
  let fixture: ComponentFixture<NavManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavManageComponent]
    });
    fixture = TestBed.createComponent(NavManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
