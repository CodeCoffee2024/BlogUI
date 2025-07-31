import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingPaginationComponent } from './listing-pagination.component';

describe('ListingPaginationComponent', () => {
  let component: ListingPaginationComponent;
  let fixture: ComponentFixture<ListingPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
