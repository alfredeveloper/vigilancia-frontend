import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorAddComponent } from './collaborator-add.component';

describe('CollaboratorAddComponent', () => {
  let component: CollaboratorAddComponent;
  let fixture: ComponentFixture<CollaboratorAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
