import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecomendadorComponent } from './recomendador.component';

const routes: Routes = [
  {
    path: '',
    component: RecomendadorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecomendadorRoutingModule { }
