import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpModalComponent } from './ip-modal.component';

describe('IpModalComponent', () => {
  let component: IpModalComponent;
  let fixture: ComponentFixture<IpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
