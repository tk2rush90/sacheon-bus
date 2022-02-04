import { TestBed } from '@angular/core/testing';

import { RecentStationService } from './recent-station.service';

describe('RecentStationService', () => {
  let service: RecentStationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentStationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
