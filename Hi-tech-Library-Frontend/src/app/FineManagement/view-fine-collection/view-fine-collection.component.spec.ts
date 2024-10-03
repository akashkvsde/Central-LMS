import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFineCollectionComponent } from './view-fine-collection.component';

describe('ViewFineCollectionComponent', () => {
  let component: ViewFineCollectionComponent;
  let fixture: ComponentFixture<ViewFineCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFineCollectionComponent]
    });
    fixture = TestBed.createComponent(ViewFineCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
