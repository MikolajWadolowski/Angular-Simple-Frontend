import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRentComponent } from './book-rent.component';

describe('BookRentComponent', () => {
  let component: BookRentComponent;
  let fixture: ComponentFixture<BookRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookRentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
