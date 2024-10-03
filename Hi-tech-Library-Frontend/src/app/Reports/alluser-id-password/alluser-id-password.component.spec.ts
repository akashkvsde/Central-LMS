import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlluserIdPasswordComponent } from './alluser-id-password.component';

describe('AlluserIdPasswordComponent', () => {
  let component: AlluserIdPasswordComponent;
  let fixture: ComponentFixture<AlluserIdPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlluserIdPasswordComponent]
    });
    fixture = TestBed.createComponent(AlluserIdPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
