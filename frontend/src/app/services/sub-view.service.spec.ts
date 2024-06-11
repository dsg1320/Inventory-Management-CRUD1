import { TestBed } from '@angular/core/testing';

import { SubViewService } from './sub-view.service';

describe('SubViewService', () => {
  let service: SubViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
