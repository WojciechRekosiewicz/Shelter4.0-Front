import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAdvertDetailsComponent } from './user-advert-details.component';



describe('UserAdvertDetailsComponent', () => {
  let component: UserAdvertDetailsComponent;
  let fixture: ComponentFixture<UserAdvertDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdvertDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdvertDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
