import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupveterinaireComponent } from './signupveterinaire.component';

describe('SignupveterinaireComponent', () => {
  let component: SignupveterinaireComponent;
  let fixture: ComponentFixture<SignupveterinaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupveterinaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupveterinaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
