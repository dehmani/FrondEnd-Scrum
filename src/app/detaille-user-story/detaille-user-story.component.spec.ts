import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleUserStoryComponent } from './detaille-user-story.component';

describe('DetailleUserStoryComponent', () => {
  let component: DetailleUserStoryComponent;
  let fixture: ComponentFixture<DetailleUserStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailleUserStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailleUserStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
