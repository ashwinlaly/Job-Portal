import { TestBed } from '@angular/core/testing';

import { PopService } from './pop.service';

describe('PopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopService = TestBed.get(PopService);
    expect(service).toBeTruthy();
  });
});
