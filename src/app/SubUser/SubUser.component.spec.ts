/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubUserComponent } from './SubUser.component';

describe('SubUserComponent', () => {
  let component: SubUserComponent;
  let fixture: ComponentFixture<SubUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
