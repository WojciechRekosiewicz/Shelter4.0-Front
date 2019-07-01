import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAdvertListComponent } from './user-advert-list.component';

describe('UserAdvertListComponent', () => {
  let component: UserAdvertListComponent;
  let fixture: ComponentFixture<UserAdvertListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdvertListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdvertListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
