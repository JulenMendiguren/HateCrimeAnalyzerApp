import { Component, OnInit } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    constructor(
        private faio: FingerprintAIO,
        private router: Router,
        private navCtrl: NavController,
        private storage: Storage
    ) {
        if (this.router.getCurrentNavigation().extras.state) {
            this.settingPassword = this.router.getCurrentNavigation().extras.state.settingPassword;
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
                console.log('Incorrect password!');
            }
        });
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
