import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSoloSelectDropdownComponent } from './admin-solo-select-dropdown.component';

describe('AdminSoloSelectDropdownComponent', () => {
  let component: AdminSoloSelectDropdownComponent;
  let fixture: ComponentFixture<AdminSoloSelectDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSoloSelectDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSoloSelectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
