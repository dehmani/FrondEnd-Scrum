import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleEpicComponent } from './detaille-epic.component';

describe('DetailleEpicComponent', () => {
  let component: DetailleEpicComponent;
  let fixture: ComponentFixture<DetailleEpicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailleEpicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailleEpicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
