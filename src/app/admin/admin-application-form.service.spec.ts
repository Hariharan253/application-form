import { TestBed } from '@angular/core/testing';

import { AdminApplicationFormService } from './admin-application-form.service';

describe('AdminApplicationFormService', () => {
  let service: AdminApplicationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminApplicationFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
