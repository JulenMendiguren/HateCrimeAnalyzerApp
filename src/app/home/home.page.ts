import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    loading: any;
    constructor(
        private storage: Storage,
        private router: Router,
        private alertController: AlertController,
        private translate: TranslateService,
        private loadingController: LoadingController
    ) {}

    ngOnInit() {}

    goToReportAutoPlaceAndDate() {
        this.presentAlertWarning(() => {
            this.presentLoading();
            this.router.navigate(['/report/auto']);
        });
    }
    goToReport() {
        this.presentAlertWarning(() => {
            this.presentLoading();
            this.router.navigate(['/report/default']);
        });
    }

    ionViewWillLeave() {
        this.loading.dismiss();
    }
    // Sets up Loading for later use
    async presentLoading() {
        const message = this.translate.instant('geolocation.loading');
        this.loading = await this.loadingController.create({
            message,
        });
        await this.loading.present();
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
