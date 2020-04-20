import { Component, OnInit, ɵLOCALE_DATA } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/components/question.model';
import { format } from 'date-fns';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/services/api.service';
import { LanguageService } from 'src/app/services/language.service';
import { ColectivesService } from 'src/app/services/colectives.service';

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
        private languageService: LanguageService,
        private colectivesService: ColectivesService
    ) {}

    ngOnInit() {
        this.userQ = this.route.snapshot.data['userQ'];
        this.userA = this.route.snapshot.data['userA'];
        this.lang = this.languageService.selected;
        this.colectivesService.loadColectivesFromStorage();
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
                answerString = this.getClosedQuestionAnswer(found);
                break;
            case 'yesno':
                answerString = this.getClosedQuestionAnswer(found);
                break;
            case 'radio':
                answerString = this.getClosedQuestionAnswer(found);
                break;
            case 'multiselect':
                answerString = this.getMultiSelectAnswer(found);
                break;
            case 'colective':
                answerString = this.getColectiveAnswer(found);
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

    getClosedQuestionAnswer(ansObj) {
        let q = this.userQ.questions.find((q) => q._id == ansObj._id);
        return q['possibleAnswers_' + this.lang][ansObj.answer];
    }

    getMultiSelectAnswer(ansObj) {
        let q = this.userQ.questions.find((q) => q._id == ansObj._id);
        let answerString: string = '';

        // For each answer index
        ansObj.answer.forEach((index) => {
            answerString =
                answerString +
                q['possibleAnswers_' + this.lang][index] +
                '<br>';
        });
        return answerString;
    }

    getColectiveAnswer(ansObj): string {
        console.log('Entra en getColectiveAnswer');
        let answerString: string = '';
        ansObj.answer.forEach((colId) => {
            const col = this.colectivesService.allColectives.find(
                (col) => col._id == colId
            );
            console.log('col', colId, this.colectivesService.allColectives);
            if (col) {
                answerString = answerString + col['text_' + this.lang] + '<br>';
            }
        });
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
