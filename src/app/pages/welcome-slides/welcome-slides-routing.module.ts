import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeSlidesPage } from './welcome-slides.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomeSlidesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeSlidesPageRoutingModule {}
