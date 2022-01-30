import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusSearchModalComponent } from './bus-search-modal.component';

describe('BusSearchModalComponent', () => {
  let component: BusSearchModalComponent;
  let fixture: ComponentFixture<BusSearchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusSearchModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusSearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
