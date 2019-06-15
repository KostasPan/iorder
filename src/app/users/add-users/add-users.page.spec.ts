import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersPage } from './add-users.page';

describe('AddUsersPage', () => {
  let component: AddUsersPage;
  let fixture: ComponentFixture<AddUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUsersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
