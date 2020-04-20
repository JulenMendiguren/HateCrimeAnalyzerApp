import { TestBed } from '@angular/core/testing';

import { ColectivesService } from './colectives.service';

describe('ColectivesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColectivesService = TestBed.get(ColectivesService);
    expect(service).toBeTruthy();
  });
});
