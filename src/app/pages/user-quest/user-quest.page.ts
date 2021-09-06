import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CanComponentDeactivate } from 'src/app/services/confirm-exit.guard';
import { ValidationService } from 'src/app/services/validation.service';
import {
    ModalController,
    AlertController,
    NavController,
} from '@ionic/angular';
import { GoogleMapsPage } from '../google-maps/google-maps.page';
import { FormGroup } from '@angular/forms';
import { Question } from 'src/app/components/question.model';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/app/services/api.service';
import { LanguageService } from 'src/app/services/language.service';
import { ColectivesService } from 'src/app/services/colectives.service';

@Component({
    selector: 'app-user-quest',
    templateUrl: './user-quest.page.html',
    styleUrls: ['./user-quest.page.scss'],
})
export class UserQuestPage implements OnInit, CanComponentDeactivate {
    userQ;
    userA;
    colectives;
    firstRegister = true;
    public lang: string;
    public parentForm: FormGroup;
    public errorMessages = {};
    submitted = false;
    public onMap = false;

    constructor(
        private route: ActivatedRoute,
        private navCtrl: NavController,
        private translate: TranslateService,
        private storage: Storage,
        private validationService: ValidationService,
        private modalController: ModalController,
        private alertController: AlertController,
        private languageService: LanguageService,
        private colectivesService: ColectivesService
    ) {}

    ngOnInit() {
        this.lang = this.languageService.selected;

        this.userQ = this.route.snapshot.data['userQ'];

        this.colectives = this.route.snapshot.data['colectives'];
        this.colectivesService.setAllColectives(this.colectives);
        this.colectivesService.loadColectivesFromStorage();
        this.setValidators();

        // Load answers (if avaliable)
        if (this.route.snapshot.data['userA']) {
            this.userA = this.route.snapshot.data['userA'];
            this.fillAnswers();
        } else {
            this.userA = {};
        }

        this.storage.get('registered').then((val) => {
            this.firstRegister = val ? false : true;
        });
    }

    // Fills the answers for the user to edit
    fillAnswers() {
        this.userA.answers.forEach((obj) => {
            if (this.parentForm.controls[obj._id]) {
                this.parentForm.controls[obj._id].setValue(obj.answer);
            }
        });
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
                markerCoordsString: this.parentForm.controls[Q_ID].value,
            },
        });
        modal.onWillDismiss().then((dataReturned) => {
            this.parentForm.controls[Q_ID].setValue(dataReturned.data);
            this.onMap = false;
        });
        this.onMap = true;
        return await modal.present();
    }

    onModal() {
        return this.onMap ? { display: 'none' } : { display: 'block' };
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
        const promise = new Promise<boolean>((resolve) => {
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
                    handler: () => resolveFunction(false),
                },
                {
                    text: yes,
                    handler: () => resolveFunction(true),
                },
            ],
        });
        await alert.present();
        return promise;
    }
    // Will be shown if it has a valid tag
    // If its a subquestion, it will be shown or not, depending on the parent question.
    showingQuestion(q: Question) {
        if (!this.colectivesService.userColectives.includes(q.tag)) {
            return { display: 'none' };
        }

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
            q.options.requiredAnswerIndex &&
            this.parentForm.controls[q.options.subquestionOf].value ==
                q.options.requiredAnswerIndex
        ) {
            return { display: 'block' };
        } // If main is valid and there is no required answer
        else if (mainValid && !q.options.requiredAnswerIndex) {
            return { display: 'block' };
        } // Main is invalid  or the required answer is not correct
        else {
            return { display: 'none' };
        }
    }

    // Returns true if all the must questions that the user sees are valid
    public canSubmit() {
        let mustBeValidQuestions = this.userQ.questions.filter((q) =>
            this.colectivesService.userColectives.includes(q.tag)
        );

        let enabled = true;
        mustBeValidQuestions.forEach((q) => {
            if (!this.parentForm.controls[q._id].valid) {
                enabled = false;
            }
        });
        return enabled;
    }

    public submit() {
        this.submitted = true;

        this.userA['questionnaire_ID'] = this.userQ._id;

        let answers = [];

        let mustBeValidQuestions = this.userQ.questions.filter((q) =>
            this.colectivesService.userColectives.includes(q.tag)
        );
        let mustBeValidQuestionsIds = [];
        mustBeValidQuestions.forEach((q) => {
            mustBeValidQuestionsIds.push(q._id);
        });

        mustBeValidQuestionsIds.forEach((_id) => {
            answers.push({
                _id,
                answer: this.parentForm.value[_id],

                questionType: mustBeValidQuestions.find((q) => q._id == _id)
                    .type,
            });
        });

        this.userA['questionnaire'] = this.userQ;
        this.userA['answers'] = answers;

        this.storage.set('userQ', this.userQ);
        this.storage.set('userA', this.userA);     

        if (this.firstRegister) {
            this.storage.set('registered', true);
            this.navCtrl.navigateForward('home');
        } else {
            this.navCtrl.navigateBack('user');
        }
    }
}
