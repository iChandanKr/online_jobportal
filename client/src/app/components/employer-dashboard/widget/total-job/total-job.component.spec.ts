import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalJobComponent } from './total-job.component';

describe('TotalJobComponent', () => {
  let component: TotalJobComponent;
  let fixture: ComponentFixture<TotalJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
