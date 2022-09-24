import { NgModule } from '@angular/core';

import { RecomendadorRoutingModule } from './recomendador-routing.module';
import { RecomendadorComponent } from './recomendador.component';
import { SharedModule } from '../shared/shared.module';
import { RecomendadosDialogComponent } from './recomendados-dialog/recomendados-dialog.component';
import { PlayerDetailBottomSheetComponent } from './player-detail-bottom-sheet/player-detail-bottom-sheet.component';


@NgModule({
  declarations: [
    RecomendadorComponent,
    RecomendadosDialogComponent,
    PlayerDetailBottomSheetComponent
  ],
  imports: [
    RecomendadorRoutingModule,
    SharedModule
  ]
})
export class RecomendadorModule { }
