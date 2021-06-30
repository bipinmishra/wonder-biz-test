import { TestBed } from '@angular/core/testing';

import { CountryMapService } from './country-map.service';

describe('CountryMapService', () => {
  let service: CountryMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
