import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookGroupComponent } from './edit-book-group.component';

describe('EditBookGroupComponent', () => {
  let component: EditBookGroupComponent;
  let fixture: ComponentFixture<EditBookGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBookGroupComponent]
    });
    fixture = TestBed.createComponent(EditBookGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
