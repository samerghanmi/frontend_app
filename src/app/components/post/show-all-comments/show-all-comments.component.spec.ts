import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowAllCommentsComponent } from './show-all-comments.component';

describe('ShowAllCommentsComponent', () => {
  let component: ShowAllCommentsComponent;
  let fixture: ComponentFixture<ShowAllCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
