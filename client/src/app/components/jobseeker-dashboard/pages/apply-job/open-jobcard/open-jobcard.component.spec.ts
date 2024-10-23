import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenJobcardComponent } from './open-jobcard.component';

describe('OpenJobcardComponent', () => {
  let component: OpenJobcardComponent;
  let fixture: ComponentFixture<OpenJobcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenJobcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenJobcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
