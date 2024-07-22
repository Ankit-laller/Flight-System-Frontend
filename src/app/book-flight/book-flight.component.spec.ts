/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookFlightComponent } from './book-flight.component';

describe('BookFlightComponent', () => {
  let component: BookFlightComponent;
  let fixture: ComponentFixture<BookFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
