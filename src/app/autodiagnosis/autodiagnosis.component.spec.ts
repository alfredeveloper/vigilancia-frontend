import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutodiagnosisComponent } from './autodiagnosis.component';

describe('AutodiagnosisComponent', () => {
  let component: AutodiagnosisComponent;
  let fixture: ComponentFixture<AutodiagnosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutodiagnosisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutodiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
