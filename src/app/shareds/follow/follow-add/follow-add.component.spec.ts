import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowAddComponent } from './follow-add.component';

describe('FollowAddComponent', () => {
  let component: FollowAddComponent;
  let fixture: ComponentFixture<FollowAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
