import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAdvertDeleteComponent } from './user-advert-delete.component';



describe('UserAdvertDeleteComponent', () => {
  let component: UserAdvertDeleteComponent;
  let fixture: ComponentFixture<UserAdvertDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdvertDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdvertDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
