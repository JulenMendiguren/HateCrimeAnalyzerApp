import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportPage } from './report.page';
import { ConfirmExitGuard } from 'src/app/services/confirm-exit.guard';

const routes: Routes = [
    {
        path: '',
        canDeactivate: [ConfirmExitGuard],
        component: ReportPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportPageRoutingModule {}
