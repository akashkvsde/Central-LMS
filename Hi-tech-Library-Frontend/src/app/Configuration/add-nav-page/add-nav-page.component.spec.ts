import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNavPageComponent } from './add-nav-page.component';

describe('AddNavPageComponent', () => {
  let component: AddNavPageComponent;
  let fixture: ComponentFixture<AddNavPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNavPageComponent]
    });
    fixture = TestBed.createComponent(AddNavPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
