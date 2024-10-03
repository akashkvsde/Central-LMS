import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCollegeComponent } from './list-of-college.component';

describe('ListOfCollegeComponent', () => {
  let component: ListOfCollegeComponent;
  let fixture: ComponentFixture<ListOfCollegeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfCollegeComponent]
    });
    fixture = TestBed.createComponent(ListOfCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
