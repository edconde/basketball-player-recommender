import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendadosDialogComponent } from './recomendados-dialog.component';

describe('RecomendadosDialogComponent', () => {
  let component: RecomendadosDialogComponent;
  let fixture: ComponentFixture<RecomendadosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomendadosDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendadosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
