import { Component, OnInit, ɵLOCALE_DATA } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/components/question.model';
import { format } from 'date-fns';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-user',
    templateUrl: './user.page.html',
    styleUrls: ['./user.page.scss']
})
export class UserPage implements OnInit {
    userQ;
    userA;
    constructor(
        private storage: Storage,
        private route: ActivatedRoute,
        private translate: TranslateService,
        private router: Router
    ) {}

    ngOnInit() {
        console.log('USER ON INIT');
        this.userQ = this.route.snapshot.data['userQ'];
        this.userA = this.route.snapshot.data['userA'];
    }

    ionViewWillEnter() {
        this.userQ = this.route.snapshot.data['userQ'];
        this.userA = this.route.snapshot.data['userA'];
    }

    getClass(q: Question) {
        if (!!q.options.subquestionOf) {
            return 'subquestion';
        } else {
            return 'main-question';
        }
    }

    getAnswer(q: Question) {
        let answer: string;
        if (!this.userA.answers[q.Q_ID]) {
            return answer;
        }
        switch (q.type) {
            case 'datetime':
                answer = this.getDatetimeAnswer(
                    q.Q_ID,
                    q.options.datetimeFormat
                );
                break;

            case 'likert':
                answer = this.getLikertAnswer(q.Q_ID);
                break;
            case 'yesno':
                answer = this.getYesnoAnswer(q.Q_ID);
                break;
            default:
                answer = this.userA.answers[q.Q_ID];
                break;
        }
        return answer;
    }

    getYesnoAnswer(Q_ID: string): string {
        let answerString = '';
        switch (this.userA.answers[Q_ID]) {
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

    getLikertAnswer(Q_ID: string): string {
        let answerString = '';
        switch (this.userA.answers[Q_ID]) {
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

    getDatetimeAnswer(Q_ID: string, datetimeFormat: string): string {
        const date: Date = new Date(this.userA.answers[Q_ID]);
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
}
