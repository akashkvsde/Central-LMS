import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNavigationPagesComponent } from './add-navigation-pages.component';

describe('AddNavigationPagesComponent', () => {
  let component: AddNavigationPagesComponent;
  let fixture: ComponentFixture<AddNavigationPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNavigationPagesComponent]
    });
    fixture = TestBed.createComponent(AddNavigationPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
