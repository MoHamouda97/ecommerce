import { TestBed } from '@angular/core/testing';

import { DatabindingService } from './databinding.service';

describe('DatabindingService', () => {
  let service: DatabindingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabindingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
