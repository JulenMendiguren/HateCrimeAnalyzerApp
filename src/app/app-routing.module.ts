import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ConfirmExitGuard } from './services/confirm-exit.guard';
import { UserQResolverService } from './services/resolvers/user-q-resolver.service';
import { UserAResolverService } from './services/resolvers/user-a-resolver.service';
import { ReportResolverService } from './services/resolvers/report-resolver.service';
import { ColectivesResolverService } from './services/resolvers/colectives.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',

        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomePageModule),
    },
    {
        path: 'report/:auto',
        resolve: {
            reportQ: ReportResolverService,
            userA: UserAResolverService,
            colectives: ColectivesResolverService,
        },
        loadChildren: () =>
            import('./pages/report/report.module').then(
                (m) => m.ReportPageModule
            ),
    },
    {
        path: 'user',

        children: [
            {
                path: 'user-quest/:update',
                resolve: {
                    userQ: UserQResolverService,
                    userA: UserAResolverService,
                    colectives: ColectivesResolverService,
                },
                loadChildren: () =>
                    import('./pages/user-quest/user-quest.module').then(
                        (m) => m.UserQuestPageModule
                    ),
            },
            {
                path: '',
                resolve: {
                    userQ: UserQResolverService,
                    userA: UserAResolverService,
                    colectives: ColectivesResolverService,
                },
                loadChildren: () =>
                    import('./pages/user/user.module').then(
                        (m) => m.UserPageModule
                    ),
            },
        ],
    },
    {
        path: 'welcome-slides',
        loadChildren: () =>
            import('./pages/welcome-slides/welcome-slides.module').then(
                (m) => m.WelcomeSlidesPageModule
            ),
    },
    {
        path: 'settings',
        loadChildren: () =>
            import('./pages/settings/settings.module').then(
                (m) => m.SettingsPageModule
            ),
    },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
