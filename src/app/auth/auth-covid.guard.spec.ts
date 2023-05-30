import { TestBed } from '@angular/core/testing';

import { AuthCovidGuard } from './auth-covid.guard';

describe('AuthCovidGuard', () => {
  let guard: AuthCovidGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthCovidGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
