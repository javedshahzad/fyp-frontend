import { TestBed } from '@angular/core/testing';

import { ManageTopicService } from './manage-topic.service';

describe('ManageTopicService', () => {
  let service: ManageTopicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageTopicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
