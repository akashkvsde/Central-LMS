import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FineCollectionComponent } from './fine-collection.component';

describe('FineCollectionComponent', () => {
  let component: FineCollectionComponent;
  let fixture: ComponentFixture<FineCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FineCollectionComponent]
    });
    fixture = TestBed.createComponent(FineCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
