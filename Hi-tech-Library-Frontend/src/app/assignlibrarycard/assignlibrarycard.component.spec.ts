import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignlibrarycardComponent } from './assignlibrarycard.component';

describe('AssignlibrarycardComponent', () => {
  let component: AssignlibrarycardComponent;
  let fixture: ComponentFixture<AssignlibrarycardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignlibrarycardComponent]
    });
    fixture = TestBed.createComponent(AssignlibrarycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
