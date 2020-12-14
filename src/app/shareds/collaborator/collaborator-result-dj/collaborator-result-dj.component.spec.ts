import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorResultDjComponent } from './collaborator-result-dj.component';

describe('CollaboratorResultDjComponent', () => {
  let component: CollaboratorResultDjComponent;
  let fixture: ComponentFixture<CollaboratorResultDjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorResultDjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorResultDjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
