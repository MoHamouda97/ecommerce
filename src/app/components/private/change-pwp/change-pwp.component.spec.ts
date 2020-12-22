import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePwpComponent } from './change-pwp.component';

describe('ChangePwpComponent', () => {
  let component: ChangePwpComponent;
  let fixture: ComponentFixture<ChangePwpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePwpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePwpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
