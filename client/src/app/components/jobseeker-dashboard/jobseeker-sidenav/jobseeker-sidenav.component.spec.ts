import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerSidenavComponent } from './jobseeker-sidenav.component';

describe('JobseekerSidenavComponent', () => {
  let component: JobseekerSidenavComponent;
  let fixture: ComponentFixture<JobseekerSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobseekerSidenavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobseekerSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
