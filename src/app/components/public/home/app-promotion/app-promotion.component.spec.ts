import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPromotionComponent } from './app-promotion.component';

describe('AppPromotionComponent', () => {
  let component: AppPromotionComponent;
  let fixture: ComponentFixture<AppPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
