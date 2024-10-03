import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyBookTransComponent } from './daily-book-trans.component';

describe('DailyBookTransComponent', () => {
  let component: DailyBookTransComponent;
  let fixture: ComponentFixture<DailyBookTransComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyBookTransComponent]
    });
    fixture = TestBed.createComponent(DailyBookTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
