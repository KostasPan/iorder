import { TestBed } from '@angular/core/testing';

import { OrderShareService } from './order-share.service';

describe('OrderShareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderShareService = TestBed.get(OrderShareService);
    expect(service).toBeTruthy();
  });
});
