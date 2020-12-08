import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwornDeclarationComponent } from './sworn-declaration.component';

describe('SwornDeclarationComponent', () => {
  let component: SwornDeclarationComponent;
  let fixture: ComponentFixture<SwornDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwornDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwornDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
