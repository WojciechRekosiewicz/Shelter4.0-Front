import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdvertReserveComponent } from './advert-reserve.component';



describe('AdvertReserveComponent', () => {
  let component: AdvertReserveComponent;
  let fixture: ComponentFixture<AdvertReserveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertReserveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
