import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenurieComponent } from './penurie.component';

describe('PenurieComponent', () => {
  let component: PenurieComponent;
  let fixture: ComponentFixture<PenurieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenurieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenurieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
