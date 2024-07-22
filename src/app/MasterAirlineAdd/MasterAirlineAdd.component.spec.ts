/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MasterAirlineAddComponent } from './MasterAirlineAdd.component';

describe('MasterAirlineAddComponent', () => {
  let component: MasterAirlineAddComponent;
  let fixture: ComponentFixture<MasterAirlineAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAirlineAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAirlineAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
