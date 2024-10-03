import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookLocationComponent } from './add-book-location.component';

describe('AddBookLocationComponent', () => {
  let component: AddBookLocationComponent;
  let fixture: ComponentFixture<AddBookLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBookLocationComponent]
    });
    fixture = TestBed.createComponent(AddBookLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
