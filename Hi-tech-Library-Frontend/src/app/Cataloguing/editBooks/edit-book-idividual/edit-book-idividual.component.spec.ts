import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookIdividualComponent } from './edit-book-idividual.component';

describe('EditBookIdividualComponent', () => {
  let component: EditBookIdividualComponent;
  let fixture: ComponentFixture<EditBookIdividualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBookIdividualComponent]
    });
    fixture = TestBed.createComponent(EditBookIdividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
