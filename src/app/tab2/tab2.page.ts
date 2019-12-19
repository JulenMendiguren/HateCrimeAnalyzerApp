import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Question } from '../components/question.model';
import { FormGroup } from '@angular/forms';
import { ValidationService } from '../services/validation.service';
import { GoogleMapsPage } from '../pages/google-maps/google-maps.page';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    public questions: Question[] = [];
    public jsonLoaded = false;
    public parentForm: FormGroup;
    public errorMessages = {};

    constructor(
        private validationService: ValidationService,
        private modalController: ModalController
    ) {}

    ionViewDidEnter() {
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
            // trigger when about to close the modal
            var dinner = dataReturned.data;
            this.parentForm.controls[Q_ID].setValue(dinner);
            console.log('Receive: ', dinner);
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
}
