import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { IonicModule } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language.service';

@Component({
    selector: 'app-welcome-slides',
    templateUrl: './welcome-slides.page.html',
    styleUrls: ['./welcome-slides.page.scss'],
})
export class WelcomeSlidesPage implements OnInit {
    langSelected = false;
    slideOpts = {
        initialSlide: 0,
        speed: 400,
    };
    constructor(
        private router: Router,
        private storage: Storage,
        private languageService: LanguageService
    ) {}

    ngOnInit() {}

    onRegisterClick() {
        this.router.navigateByUrl('user/user-quest/update');
    }

    onLangChanged(e) {
        this.languageService.setLanguage(e.detail.value);
        this.langSelected = true;
    }
}
