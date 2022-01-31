import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationSearchResultComponent } from './station-search-result.component';

describe('StationSearchResultComponent', () => {
  let component: StationSearchResultComponent;
  let fixture: ComponentFixture<StationSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationSearchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
