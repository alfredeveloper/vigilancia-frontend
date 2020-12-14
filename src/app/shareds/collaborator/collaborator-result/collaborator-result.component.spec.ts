import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorResultComponent } from './collaborator-result.component';

describe('CollaboratorResultComponent', () => {
  let component: CollaboratorResultComponent;
  let fixture: ComponentFixture<CollaboratorResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
