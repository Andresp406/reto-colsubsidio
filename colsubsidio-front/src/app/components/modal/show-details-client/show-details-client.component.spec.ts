import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailsClientComponent } from './show-details-client.component';

describe('ShowDetailsStudentComponent', () => {
  let component: ShowDetailsClientComponent;
  let fixture: ComponentFixture<ShowDetailsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDetailsClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDetailsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
