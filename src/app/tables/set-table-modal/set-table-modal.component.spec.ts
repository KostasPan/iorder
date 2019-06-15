import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTableModalComponent } from './set-table-modal.component';

describe('SetTableModalComponent', () => {
  let component: SetTableModalComponent;
  let fixture: ComponentFixture<SetTableModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetTableModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetTableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
