import { TestBed } from '@angular/core/testing';

import { DetailsShareDataService } from './details-share-data.service';

describe('DetailsShareDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailsShareDataService = TestBed.get(DetailsShareDataService);
    expect(service).toBeTruthy();
  });
});
