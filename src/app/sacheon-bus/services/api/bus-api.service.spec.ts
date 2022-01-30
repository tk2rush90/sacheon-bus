import { TestBed } from '@angular/core/testing';

import { BusApiService } from './bus-api.service';

describe('BusApiService', () => {
  let service: BusApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
