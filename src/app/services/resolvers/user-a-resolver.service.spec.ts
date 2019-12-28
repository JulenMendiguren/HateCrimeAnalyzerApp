import { TestBed } from '@angular/core/testing';

import { UserAResolverService } from './user-a-resolver.service';

describe('UserAResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserAResolverService = TestBed.get(UserAResolverService);
    expect(service).toBeTruthy();
  });
});
