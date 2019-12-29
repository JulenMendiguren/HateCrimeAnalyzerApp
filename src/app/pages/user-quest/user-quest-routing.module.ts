import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserQuestPage } from './user-quest.page';
import { ConfirmExitGuard } from 'src/app/services/confirm-exit.guard';

const routes: Routes = [
    {
        path: '',
        canDeactivate: [ConfirmExitGuard],
        component: UserQuestPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserQuestPageRoutingModule {}
