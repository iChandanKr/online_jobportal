import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkInsertComponent } from './bulk-insert.component';

describe('BulkInsertComponent', () => {
  let component: BulkInsertComponent;
  let fixture: ComponentFixture<BulkInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkInsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
