/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MasterAirlineComponent } from './MasterAirline.component';

describe('MasterAirlineComponent', () => {
  let component: MasterAirlineComponent;
  let fixture: ComponentFixture<MasterAirlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAirlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAirlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
