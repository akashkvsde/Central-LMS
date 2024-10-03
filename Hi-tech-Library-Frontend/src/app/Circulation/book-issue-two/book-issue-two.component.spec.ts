import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookIssueTwoComponent } from './book-issue-two.component';

describe('BookIssueTwoComponent', () => {
  let component: BookIssueTwoComponent;
  let fixture: ComponentFixture<BookIssueTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookIssueTwoComponent]
    });
    fixture = TestBed.createComponent(BookIssueTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
