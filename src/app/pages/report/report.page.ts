import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/components/question.model';
import { FormGroup } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { ModalController, AlertController, Platform } from '@ionic/angular';
import { GoogleMapsPage } from '../google-maps/google-maps.page';
import { CanComponentDeactivate } from 'src/app/services/confirm-exit.guard';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-report',
    templateUrl: './report.page.html',
    styleUrls: ['./report.page.scss']
})
export class ReportPage implements OnInit, CanComponentDeactivate {
    public questions: Question[] = [];
    public jsonLoaded = false;
    public parentForm: FormGroup;
    public errorMessages = {};

    constructor(
        private validationService: ValidationService,
        private modalController: ModalController,
        private alertController: AlertController,
        private translate: TranslateService
    ) {}

    ngOnInit() {
        this.loadJson('/assets/reportQ.json').then(() => this.setValidators());
    }

    // Carga el json con las preguntas, en un futuro llamará al service para hacer una petición http
    loadJson(url: string) {
        return fetch(url)
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

    async canDeactivate() {
        //TODO: Sólo con dirty
        const confirm = await this.confirmExitAlert();

        if (confirm) {
            return true;
        } else {
            return false;
        }
    }

    private async confirmExitAlert(): Promise<boolean> {
        let resolveFunction: (confirm: boolean) => void;
        const promise = new Promise<boolean>(resolve => {
            resolveFunction = resolve;
        });

        let header, message, cancel, yes;
        this.translate.get('dialog.exit.header').subscribe((val: string) => {
            header = val;
        });
        this.translate.get('dialog.exit.message').subscribe((val: string) => {
            message = val;
        });
        this.translate.get('dialog.exit.cancel').subscribe((val: string) => {
            cancel = val;
        });
        this.translate.get('dialog.exit.yes').subscribe((val: string) => {
            yes = val;
        });

        const alert = await this.alertController.create({
            header,
            message,
            backdropDismiss: false,
            buttons: [
                {
                    role: 'cancel',
                    text: cancel,
                    handler: () => resolveFunction(false)
                },
                {
                    text: yes,
                    handler: () => resolveFunction(true)
                }
            ]
        });
        await alert.present();
        return promise;
    }

    // If its a subquestion, it will be shown or not, depending on the parent question.
    showingSubquestion(q: Question) {
        if (!q.options.subquestionOf) {
            return;
        }
        // If not valid, show it
        if (!this.parentForm.controls[q._id].valid) {
            return { display: 'block' };
        }
        const mainValid = this.parentForm.controls[q.options.subquestionOf]
            .valid;

        // If main is valid and the required answer is correct
        if (
            mainValid &&
            q.options.requiredAnswer &&
            this.parentForm.controls[q.options.subquestionOf].value ==
                q.options.requiredAnswer
        ) {
            return { display: 'block' };
        } // If main is valid and there is no required answer
        else if (mainValid && !q.options.requiredAnswer) {
            return { display: 'block' };
        } // Main is invalid  or the required answer is not correct
        else {
            return { display: 'none' };
        }
    }
}
