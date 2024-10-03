import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookTitleComponent } from './add-book-title.component';

describe('AddBookTitleComponent', () => {
  let component: AddBookTitleComponent;
  let fixture: ComponentFixture<AddBookTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBookTitleComponent]
    });
    fixture = TestBed.createComponent(AddBookTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
