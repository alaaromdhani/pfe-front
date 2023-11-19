import { TestBed } from '@angular/core/testing';

import { InactiveGuard } from './inactive.guard';

describe('InactiveGuard', () => {
  let guard: InactiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InactiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
