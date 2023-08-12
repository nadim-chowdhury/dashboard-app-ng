import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallCardComponent } from './tall-card.component';

describe('TallCardComponent', () => {
  let component: TallCardComponent;
  let fixture: ComponentFixture<TallCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TallCardComponent]
    });
    fixture = TestBed.createComponent(TallCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
