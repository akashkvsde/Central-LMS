import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookTransHistoryComponent } from './user-book-trans-history.component';

describe('UserBookTransHistoryComponent', () => {
  let component: UserBookTransHistoryComponent;
  let fixture: ComponentFixture<UserBookTransHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserBookTransHistoryComponent]
    });
    fixture = TestBed.createComponent(UserBookTransHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
