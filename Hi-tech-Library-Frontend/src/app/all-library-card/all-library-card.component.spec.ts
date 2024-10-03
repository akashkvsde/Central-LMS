import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLibraryCardComponent } from './all-library-card.component';

describe('AllLibraryCardComponent', () => {
  let component: AllLibraryCardComponent;
  let fixture: ComponentFixture<AllLibraryCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllLibraryCardComponent]
    });
    fixture = TestBed.createComponent(AllLibraryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
