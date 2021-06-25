import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeViewComponent } from './liste-view.component';

describe('ListeViewComponent', () => {
  let component: ListeViewComponent;
  let fixture: ComponentFixture<ListeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
