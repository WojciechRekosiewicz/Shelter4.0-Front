import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertUpdateComponent } from './advert-update.component';

describe('AdvertUpdateComponent', () => {
  let component: AdvertUpdateComponent;
  let fixture: ComponentFixture<AdvertUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
