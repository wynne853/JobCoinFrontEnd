import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogADDJobComponent } from './dialog-addjob.component';

describe('DialogADDJobComponent', () => {
  let component: DialogADDJobComponent;
  let fixture: ComponentFixture<DialogADDJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogADDJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogADDJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
