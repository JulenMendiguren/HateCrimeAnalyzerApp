import { TestBed } from '@angular/core/testing';

import { UserQResolverService } from './user-q-resolver.service';

describe('UserQResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserQResolverService = TestBed.get(UserQResolverService);
    expect(service).toBeTruthy();
  });
});
