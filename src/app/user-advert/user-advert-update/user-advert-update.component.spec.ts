import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAdvertUpdateComponent } from './user-advert-update.component';



describe('UserAdvertUpdateComponent', () => {
  let component: UserAdvertUpdateComponent;
  let fixture: ComponentFixture<UserAdvertUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdvertUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdvertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
