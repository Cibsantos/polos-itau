import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistersGridComponent } from './registers-grid.component';

describe('RegistersGridComponent', () => {
  let component: RegistersGridComponent;
  let fixture: ComponentFixture<RegistersGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistersGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistersGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
