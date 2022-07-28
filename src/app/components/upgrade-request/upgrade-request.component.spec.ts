import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeRequestComponent } from './upgrade-request.component';

describe('UpgradeRequestComponent', () => {
  let component: UpgradeRequestComponent;
  let fixture: ComponentFixture<UpgradeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradeRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
