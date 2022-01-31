import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTrackingComponent } from './bus-tracking.component';

describe('BusTrackingComponent', () => {
  let component: BusTrackingComponent;
  let fixture: ComponentFixture<BusTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusTrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
