import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutentificationComponent } from './autentification.component';

describe('AutentificationComponent', () => {
  let component: AutentificationComponent;
  let fixture: ComponentFixture<AutentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutentificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
