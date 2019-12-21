import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/components/question.model';
import { FormGroup } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { ModalController, AlertController, Platform } from '@ionic/angular';
import { GoogleMapsPage } from '../google-maps/google-maps.page';

@Component({
    selector: 'app-report',
    templateUrl: './report.page.html',
    styleUrls: ['./report.page.scss']
})
export class ReportPage implements OnInit {
    public questions: Question[] = [];
    public jsonLoaded = false;
    public parentForm: FormGroup;
    public errorMessages = {};

    constructor(
        private validationService: ValidationService,
        private modalController: ModalController,
        private alertController: AlertController,
        private platform: Platform
    ) {}

    ngOnInit() {
        this.loadJson().then(() => this.setValidators());
    }

    // Carga el json con las preguntas, en un futuro llamará al service para hacer una petición http
    loadJson() {
        return fetch('/assets/test.json')
            .then(file => {
                return file.json();
            })
            .then(json => {
                json.questions.forEach(element => {
                    this.questions.push(element);
                });
                this.jsonLoaded = true;
            });
    }

    // Hay que inicializar el FormGroup antes de poder usarlo para un form
    setValidators() {
        const returnedValue = this.validationService.setValidators(
            this.questions
        );
        this.parentForm = returnedValue[0];
        this.errorMessages = returnedValue[1];
    }

    async openMapModal(Q_ID: string) {
        const modal = await this.modalController.create({
            component: GoogleMapsPage,
            componentProps: {
                markerCoordsString: this.parentForm.controls[Q_ID].value
            }
        });
        modal.onWillDismiss().then(dataReturned => {
            this.parentForm.controls[Q_ID].setValue(dataReturned.data);
        });
        return await modal.present();
    }

    public findInvalidControls() {
        const invalid = [];
        const controls = this.parentForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
                invalid.push(controls[name].errors);
            }
        }
        console.log(invalid);
    }

    // async presentAlertConfirm() {
    //     const alert = await this.alertController.create({
    //         header: 'Confirm!',
    //         message: 'Message <strong>text</strong>!!!',
    //         buttons: [
    //             {
    //                 text: 'Cancel',
    //                 role: 'cancel',
    //                 cssClass: 'secondary',
    //                 handler: blah => {
    //                     console.log('Confirm Cancel: blah');
    //                 }
    //             },
    //             {
    //                 text: 'Okay',
    //                 handler: () => {
    //                     console.log('Confirm Okay');
    //                 }
    //             }
    //         ]
    //     });

    //     await alert.present();
    // }
}
