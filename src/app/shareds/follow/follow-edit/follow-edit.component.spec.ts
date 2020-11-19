import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowEditComponent } from './follow-edit.component';

describe('FollowEditComponent', () => {
  let component: FollowEditComponent;
  let fixture: ComponentFixture<FollowEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
