import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLibraryCardComponent } from './my-library-card.component';

describe('MyLibraryCardComponent', () => {
  let component: MyLibraryCardComponent;
  let fixture: ComponentFixture<MyLibraryCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyLibraryCardComponent]
    });
    fixture = TestBed.createComponent(MyLibraryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
