import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    constructor(
        private router: Router,
        private platform: Platform,
        private navCtrl: NavController,
        private storage: Storage,
        private toastController: ToastController,
        private translate: TranslateService
    ) {
        if (this.router.getCurrentNavigation().extras.state) {
            this.settingPassword =
                this.router.getCurrentNavigation().extras.state.settingPassword;
        }
        if (!this.settingPassword) {
            this.platform.backButton.subscribeWithPriority(10, () => {});
        }
    }

    inputValue: string = '';
    settingPassword = false;

    ngOnInit() {}

    login() {
        this.navCtrl.navigateBack('home');
    }

    onLoginClick() {
        this.storage.get('password').then((storedPw) => {
            if (this.inputValue === storedPw) {
                this.login();
            } else {
                this.presentToast();
            }
        });
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: this.translate.instant('LOGIN.incorrect_pw'),
            duration: 2000,
        });
        toast.present();
    }

    onSetPassword() {
        if (this.inputValue) {
            this.storage.set('password', this.inputValue);
        } else {
            this.storage.remove('password');
        }

        this.navCtrl.navigateBack('settings');
    }

    deleteUserData() {
        this.storage.clear().then(() => {
            this.router.navigateByUrl('welcome-slides');
        });
    }
}
