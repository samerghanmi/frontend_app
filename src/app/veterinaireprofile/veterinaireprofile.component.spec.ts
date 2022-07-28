import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinaireprofileComponent } from './veterinaireprofile.component';

describe('VeterinaireprofileComponent', () => {
  let component: VeterinaireprofileComponent;
  let fixture: ComponentFixture<VeterinaireprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeterinaireprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeterinaireprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
