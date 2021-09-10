import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingmodalPage } from './bookingmodal.page';

describe('BookingmodalPage', () => {
  let component: BookingmodalPage;
  let fixture: ComponentFixture<BookingmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingmodalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
