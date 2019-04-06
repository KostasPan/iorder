import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTablesPage } from './add-tables.page';

describe('AddTablesPage', () => {
  let component: AddTablesPage;
  let fixture: ComponentFixture<AddTablesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTablesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTablesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
