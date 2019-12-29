import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ConfirmExitGuard } from './services/confirm-exit.guard';
import { UserQResolverService } from './services/resolvers/user-q-resolver.service';
import { UserAResolverService } from './services/resolvers/user-a-resolver.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',

        loadChildren: () =>
            import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'report',
        loadChildren: () =>
            import('./pages/report/report.module').then(m => m.ReportPageModule)
    },
    {
        path: 'user',
        resolve: {
            userQ: UserQResolverService,
            userA: UserAResolverService
        },
        loadChildren: () =>
            import('./pages/user/user.module').then(m => m.UserPageModule)
    },
    {
        path: 'user-quest/:update',
        resolve: {
            userQ: UserQResolverService,
            userA: UserAResolverService
        },
        loadChildren: () =>
            import('./pages/user-quest/user-quest.module').then(
                m => m.UserQuestPageModule
            )
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
