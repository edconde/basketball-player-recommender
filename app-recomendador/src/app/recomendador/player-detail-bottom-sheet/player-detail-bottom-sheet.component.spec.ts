import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDetailBottomSheetComponent } from './player-detail-bottom-sheet.component';

describe('PlayerDetailBottomSheetComponent', () => {
  let component: PlayerDetailBottomSheetComponent;
  let fixture: ComponentFixture<PlayerDetailBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerDetailBottomSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDetailBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
