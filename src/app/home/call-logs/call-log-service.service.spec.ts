import { TestBed } from '@angular/core/testing';

import { CallLogService } from './call-log-service.service';

describe('CallLogServiceService', () => {
  let service: CallLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
