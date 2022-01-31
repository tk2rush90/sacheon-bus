import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivalInfoResultComponent } from './arrival-info-result.component';

describe('ArrivalInfoResultComponent', () => {
  let component: ArrivalInfoResultComponent;
  let fixture: ComponentFixture<ArrivalInfoResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrivalInfoResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrivalInfoResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
