import { TestBed } from '@angular/core/testing';

import { TablesShareService } from './tables-share.service';

describe('TablesShareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TablesShareService = TestBed.get(TablesShareService);
    expect(service).toBeTruthy();
  });
});
