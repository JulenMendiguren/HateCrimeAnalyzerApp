import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CanComponentDeactivate } from 'src/app/services/confirm-exit.guard';
import { ValidationService } from 'src/app/services/validation.service';
import {
    ModalController,
    AlertController,
    NavController
} from '@ionic/angular';
import { GoogleMapsPage } from '../google-maps/google-maps.page';
import { FormGroup } from '@angular/forms';
import { Question } from 'src/app/components/question.model';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-user-quest',
    templateUrl: './user-quest.page.html',
    styleUrls: ['./user-quest.page.scss']
})
export class UserQuestPage implements OnInit, CanComponentDeactivate {
    userQ;
    userA;
    public parentForm: FormGroup;
    public errorMessages = {};
    submitted: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private navCtrl: NavController,
        private translate: TranslateService,
        private router: Router,
        private storage: Storage,
        private validationService: ValidationService,
        private modalController: ModalController,
        private alertController: AlertController
    ) {}

    ngOnInit() {
        this.userQ = this.route.snapshot.data['userQ'];
        this.setValidators();
        if (this.route.snapshot.data['userA']) {
            this.userA = this.route.snapshot.data['userA'];
            this.fillAnswers();
        }
    }

    // Fills the answers for the user to edit
    fillAnswers() {
        const keys = Object.keys(this.userA.answers);
        for (const Q_ID of keys) {
            this.parentForm.controls[Q_ID].setValue(this.userA.answers[Q_ID]);
        }
    }

    // Hay que inicializar el FormGroup antes de poder usarlo para un form
    setValidators() {
        const returnedValue = this.validationService.setValidators(
            this.userQ.questions
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

    async canDeactivate() {
        //TODO: Sólo con dirty
        if (this.submitted) {
            return true;
        }

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
        if (!this.parentForm.controls[q.Q_ID].valid) {
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

    public submit() {
        this.submitted = true;

        this.userA['questionnaire_ID'] = this.userQ.versionID;
        this.userA['answers'] = this.parentForm.value;

        this.storage.set('userQ', this.userQ);
        this.storage.set('userA', this.userA);
        this.navCtrl.navigateBack('user');
    }
}
