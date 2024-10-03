import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksWithBarcodeComponent } from './books-with-barcode.component';

describe('BooksWithBarcodeComponent', () => {
  let component: BooksWithBarcodeComponent;
  let fixture: ComponentFixture<BooksWithBarcodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksWithBarcodeComponent]
    });
    fixture = TestBed.createComponent(BooksWithBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
