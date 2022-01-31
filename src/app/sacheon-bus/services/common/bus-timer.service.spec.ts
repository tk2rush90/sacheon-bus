import { TestBed } from '@angular/core/testing';

import { BusTimerService } from './bus-timer.service';

describe('BusTimerService', () => {
  let service: BusTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
