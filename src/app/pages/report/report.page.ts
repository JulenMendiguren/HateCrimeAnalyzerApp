import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/components/question.model';
import { FormGroup } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
    ModalController,
    AlertController,
    Platform,
    NavController,
    ToastController,
} from '@ionic/angular';
import { GoogleMapsPage } from '../google-maps/google-maps.page';
import { CanComponentDeactivate } from 'src/app/services/confirm-exit.guard';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { ColectivesService } from 'src/app/services/colectives.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.page.html',
    styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit, CanComponentDeactivate {
    public questions: Question[] = [];
    public lang: String;
    public submitted = false;
    autoPlaceAndDate: boolean;
    colectives;
    public reportQ;
    public userA;
    public jsonLoaded = false;
    public parentForm: FormGroup;
    public errorMessages = {};

    constructor(
        private validationService: ValidationService,
        private route: ActivatedRoute,
        private navCtrl: NavController,
        private modalController: ModalController,
        private alertController: AlertController,
        private geolocation: Geolocation,
        private translate: TranslateService,
        private api: ApiService,
        private toastController: ToastController,
        private languageService: LanguageService,
        private colectivesService: ColectivesService
    ) {}

    ngOnInit() {
        this.lang = this.languageService.selected;

        this.autoPlaceAndDate =
            this.route.snapshot.paramMap.get('auto') == 'auto' ? true : false;

        this.reportQ = this.route.snapshot.data['reportQ'];
        this.questions = this.reportQ.questions;

        this.userA = this.route.snapshot.data['userA'];

        this.colectives = this.route.snapshot.data['colectives'];
        this.colectivesService.setAllColectives(this.colectives);
        this.colectivesService.loadColectivesFromStorage();

        this.setValidators();

        if (this.autoPlaceAndDate) {
            this.setAutoPlaceAndDate();
        }
    }

    // Sets current pos and date to the respective question validator
    setAutoPlaceAndDate() {
        let now = new Date();
        let nowString = now.toISOString();

        // q._id are hardcoded, find better solution, maybe??
        this.parentForm.controls['5e9dc31893a510057385e772'].setValue(
            nowString
        );

        this.geolocation
            .getCurrentPosition()
            .then((resp) => {
                let pos = resp.coords.latitude + ',' + resp.coords.longitude;
                this.parentForm.controls['5e9dc343b6022105820960de'].setValue(
                    pos
                );
            })
            .catch((error) => {
                console.log('Error getting location', error);
            });
    }

    // Carga el json con las preguntas, en un futuro llamará al service para hacer una petición http
    loadJson(url: string) {
        return fetch(url)
            .then((file) => {
                return file.json();
            })
            .then((json) => {
                json.questions.forEach((element) => {
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
                markerCoordsString: this.parentForm.controls[Q_ID].value,
            },
        });
        modal.onWillDismiss().then((dataReturned) => {
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
        if (
            this.autoPlaceAndDate &&
            q._id == '5e9dc31893a510057385e772' &&
            this.parentForm.controls['5e9dc31893a510057385e772'].valid
        ) {
            return { display: 'none' };
        }
        if (
            this.autoPlaceAndDate &&
            q._id == '5e9dc343b6022105820960de' &&
            this.parentForm.controls['5e9dc343b6022105820960de'].valid
        ) {
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
        let mustBeValidQuestions = this.reportQ.questions.filter((q) =>
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
        console.log('-----> SUBMITTED');
        this.submitted = true;

        let reportJSON = {};

        let answers = [];

        let mustBeValidQuestions = this.reportQ.questions.filter((q) =>
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

        reportJSON['questionnaire'] = this.reportQ;
        reportJSON['answers'] = answers;
        reportJSON['userQuestionnaire'] = this.userA.questionnaire;
        reportJSON['userAnswers'] = this.userA.answers;
        reportJSON['userCol'] = this.colectivesService.userColectives;

        console.log('FULL JSON ', reportJSON);

        this.api.postReport(reportJSON).subscribe((res) => {
            console.log(res);
        });

        this.presentAlertThankyou(() => {
            this.presentToastReportSent();
            this.navCtrl.navigateBack('home');
        });
    }

    async presentToastReportSent() {
        this.translate
            .get('REPORT.toast_report_sent')
            .subscribe(async (msg: string) => {
                const toast = await this.toastController.create({
                    message: msg,
                    duration: 3000,
                });
                toast.present();
            });
    }

    async presentAlertThankyou(callback) {
        let header, message;
        this.translate
            .get('dialog.thankyou.header')
            .subscribe((val: string) => {
                header = val;
            });
        this.translate
            .get('dialog.thankyou.message')
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
