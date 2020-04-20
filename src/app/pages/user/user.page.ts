import { Component, OnInit, ɵLOCALE_DATA } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/components/question.model';
import { format } from 'date-fns';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/services/api.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.page.html',
    styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
    userQ;
    userA;
    lang: string;
    updateAvaliable: boolean = false;
    constructor(
        private storage: Storage,
        private api: ApiService,
        private route: ActivatedRoute,
        private translate: TranslateService,
        private router: Router,
        private languageService: LanguageService
    ) {}

    ngOnInit() {
        this.userQ = this.route.snapshot.data['userQ'];
        this.userA = this.route.snapshot.data['userA'];
        this.lang = this.languageService.selected;
        this.checkIfUpdateAvaliable();
    }

    ionViewWillEnter() {
        this.userQ = this.route.snapshot.data['userQ'];
        this.userA = this.route.snapshot.data['userA'];
        this.checkIfUpdateAvaliable();
    }

    getClass(q: Question) {
        if (!!q.options.subquestionOf) {
            return 'subquestion';
        } else {
            return 'main-question';
        }
    }

    getAnswer(q: Question) {
        let answerString: string;

        const found = this.userA.answers.find(
            (element) => element._id == q._id
        );

        if (!found) {
            return answerString;
        }
        switch (q.type) {
            case 'datetime':
                answerString = this.getDatetimeAnswer(
                    found,
                    q.options.datetimeFormat
                );
                break;

            case 'likert':
                answerString = this.getLikertAnswer(found);
                break;
            case 'yesno':
                answerString = this.getYesnoAnswer(found);
                break;
            default:
                answerString = found.answer;
                break;
        }
        return answerString;
    }

    hasAnswer(Q_ID: string) {
        const found = this.userA.answers.find((element) => element._id == Q_ID);
        return found && found.answer ? true : false;
    }

    getYesnoAnswer(ansObj): string {
        let answerString = '';
        switch (ansObj.answer) {
            case 'yes':
                this.translate.get('yesno.yes').subscribe((val: string) => {
                    answerString = val;
                });
                break;
            case 'no':
                this.translate.get('yesno.no').subscribe((val: string) => {
                    answerString = val;
                });
                break;
            default:
                break;
        }
        return answerString;
    }

    getLikertAnswer(ansObj): string {
        let answerString = '';
        switch (ansObj.answer) {
            case 'sd':
                this.translate.get('likert.sd').subscribe((val: string) => {
                    answerString = val;
                });
                break;
            case 'd':
                this.translate.get('likert.d').subscribe((val: string) => {
                    answerString = val;
                });
                break;
            case 'n':
                this.translate.get('likert.n').subscribe((val: string) => {
                    answerString = val;
                });
                break;
            case 'a':
                this.translate.get('likert.a').subscribe((val: string) => {
                    answerString = val;
                });
                break;
            case 'sa':
                this.translate.get('likert.sa').subscribe((val: string) => {
                    answerString = val;
                });
                break;
            default:
                break;
        }
        return answerString;
    }

    getDatetimeAnswer(ansObj, datetimeFormat: string): string {
        const date: Date = new Date(ansObj.answer);
        switch (datetimeFormat) {
            case 'date':
                return format(date, 'd-MM-yyyy');
            case 'time':
                return format(date, 'HH:mm');
            default:
                return format(date, 'd-MM-yyyy HH:mm');
        }
    }

    navigateUpdate() {
        this.router.navigateByUrl('user/user-quest/update');
    }
    navigateEdit() {
        this.router.navigateByUrl('user/user-quest/');
    }

    checkIfUpdateAvaliable() {
        this.api.getLastUserQ().subscribe((last) => {
            if (last[0]._id != this.userQ._id) {
                console.log('update avaliable');
                this.updateAvaliable = true;
            } else {
                console.log('update not avaliable');
                this.updateAvaliable = false;
            }
        });
    }
}
