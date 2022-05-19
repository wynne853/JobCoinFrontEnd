import { TestBed } from '@angular/core/testing';

import { JobOpportunityService } from './job-opportunity.service';

describe('JobOpportunityService', () => {
  let service: JobOpportunityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobOpportunityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
