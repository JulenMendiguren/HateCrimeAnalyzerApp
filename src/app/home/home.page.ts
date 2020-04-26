import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    constructor(
        private storage: Storage,
        private router: Router,
        private alertController: AlertController,
        private translate: TranslateService
    ) {}

    ngOnInit() {
        //this.setTestUserQ();
    }
    setTestUserQ() {
        this.loadJson('/assets/userQ.json')
            .then((json) => {
                this.storage.set('userQ', json);
            })
            .then(() =>
                this.loadJson('/assets/userA.json').then((json) => {
                    this.storage.set('userA', json);
                })
            );
    }

    loadJson(url: string) {
        return fetch(url).then((file) => {
            return file.json();
        });
    }

    goToReportAutoPlaceAndDate() {
        this.presentAlertWarning(() => this.router.navigate(['/report/auto']));
    }
    goToReport() {
        this.presentAlertWarning(() =>
            this.router.navigate(['/report/default'])
        );
    }

    async presentAlertWarning(callback) {
        let header, message;
        this.translate.get('dialog.warning.header').subscribe((val: string) => {
            header = val;
        });
        this.translate
            .get('dialog.warning.message')
            .subscribe((val: string) => {
                message = val;
            });

        const alert = await this.alertController.create({
            header,
            message,
            buttons: [
                {
                    text: 'OK',
                    handler: () => callback(),
                },
            ],
        });

        await alert.present();
    }
}
