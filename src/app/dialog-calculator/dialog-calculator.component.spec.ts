import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCalculatorComponent } from './dialog-calculator.component';

describe('DialogCalculatorComponent', () => {
  let component: DialogCalculatorComponent;
  let fixture: ComponentFixture<DialogCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
