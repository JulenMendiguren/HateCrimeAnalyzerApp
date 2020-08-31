import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LanguageService } from './services/language.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private languageService: LanguageService,
        private storage: Storage,
        private router: Router
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.languageService.setInitialAppLanguage();

            this.storage.get('password').then((pw) => {
                if (pw) {
                    this.router.navigateByUrl('login');
                }
                this.storage.get('registered').then((val) => {
                    if (!val) {
                        this.router.navigateByUrl('welcome-slides');
                    }
                });
            });

            this.platform.pause.subscribe(() => {
                this.storage.get('password').then((pw) => {
                    if (pw) {
                        this.router.navigateByUrl('login');
                    }
                });
            });
        });
    }
}
