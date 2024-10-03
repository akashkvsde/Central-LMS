import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookIssueComponent } from './book-issue.component';

describe('BookIssueComponent', () => {
  let component: BookIssueComponent;
  let fixture: ComponentFixture<BookIssueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookIssueComponent]
    });
    fixture = TestBed.createComponent(BookIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
