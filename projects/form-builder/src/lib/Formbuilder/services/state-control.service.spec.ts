import { TestBed } from '@angular/core/testing';

import { StateControlService } from './state-control.service';

describe('StateControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateControlService = TestBed.get(StateControlService);
    expect(service).toBeTruthy();
  });
});
