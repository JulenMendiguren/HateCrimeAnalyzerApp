import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
    constructor(
        private languageService: LanguageService,
        private storage: Storage,
        private router: Router
    ) {}

    ngOnInit() {}

    onLangChanged(e) {
        this.languageService.setLanguage(e.detail.value);
    }

    deleteUserData() {
        this.storage.clear().then(() => {
            this.router.navigateByUrl('welcome-slides');
        });
    }

    setPassword() {
        const navigationExtras: NavigationExtras = {
            state: {
                settingPassword: true,
            },
        };
        this.router.navigate(['login'], navigationExtras);
    }
}
