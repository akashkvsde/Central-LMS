import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReportBasedOnAuthorPublisherComponent } from './book-report-based-on-author-publisher.component';

describe('BookReportBasedOnAuthorPublisherComponent', () => {
  let component: BookReportBasedOnAuthorPublisherComponent;
  let fixture: ComponentFixture<BookReportBasedOnAuthorPublisherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookReportBasedOnAuthorPublisherComponent]
    });
    fixture = TestBed.createComponent(BookReportBasedOnAuthorPublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
