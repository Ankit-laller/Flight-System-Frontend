/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ForwarderComponent } from './forwarder.component';

describe('ForwarderComponent', () => {
  let component: ForwarderComponent;
  let fixture: ComponentFixture<ForwarderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForwarderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwarderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
