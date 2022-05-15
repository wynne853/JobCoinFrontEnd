import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAreaComponent } from './my-area.component';

describe('MyAreaComponent', () => {
  let component: MyAreaComponent;
  let fixture: ComponentFixture<MyAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
