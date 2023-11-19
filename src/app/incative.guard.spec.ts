import { TestBed } from '@angular/core/testing';

import { IncativeGuard } from './incative.guard';

describe('IncativeGuard', () => {
  let guard: IncativeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IncativeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
