import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBooksRequestsComponent } from './users-books-requests.component';

describe('UsersBooksRequestsComponent', () => {
  let component: UsersBooksRequestsComponent;
  let fixture: ComponentFixture<UsersBooksRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersBooksRequestsComponent]
    });
    fixture = TestBed.createComponent(UsersBooksRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
