import { TestBed } from '@angular/core/testing';

import { SelectedStationService } from './selected-station.service';

describe('SelectedStationService', () => {
  let service: SelectedStationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedStationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
