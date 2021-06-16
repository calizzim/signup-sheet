import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSheetComponent } from './signup-sheet.component';

describe('SignupSheetComponent', () => {
  let component: SignupSheetComponent;
  let fixture: ComponentFixture<SignupSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
