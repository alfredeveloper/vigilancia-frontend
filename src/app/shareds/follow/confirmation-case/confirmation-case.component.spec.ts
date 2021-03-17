import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationCaseComponent } from './confirmation-case.component';

describe('ConfirmationCaseComponent', () => {
  let component: ConfirmationCaseComponent;
  let fixture: ComponentFixture<ConfirmationCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
