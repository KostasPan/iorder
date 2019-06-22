import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTablesModalComponent } from './show-tables-modal.component';

describe('ShowTablesModalComponent', () => {
  let component: ShowTablesModalComponent;
  let fixture: ComponentFixture<ShowTablesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTablesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTablesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
