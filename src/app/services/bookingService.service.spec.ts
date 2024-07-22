/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BookingServiceService } from './bookingService.service';

describe('Service: BookingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookingServiceService]
    });
  });

  it('should ...', inject([BookingServiceService], (service: BookingServiceService) => {
    expect(service).toBeTruthy();
  }));
});
