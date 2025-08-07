import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleUpdateComponent } from './user-role-update.component';

describe('UserRoleUpdateComponent', () => {
  let component: UserRoleUpdateComponent;
  let fixture: ComponentFixture<UserRoleUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRoleUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
