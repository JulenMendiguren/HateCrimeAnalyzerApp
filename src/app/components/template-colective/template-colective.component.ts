import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';
import { Storage } from '@ionic/storage';
import { Question } from '../question.model';
import { ColectivesService } from 'src/app/services/colectives.service';

@Component({
    selector: 'app-template-colective',
    templateUrl: './template-colective.component.html',
    styleUrls: [
        '../../pages/report/report.page.scss',
        './template-colective.component.scss',
    ],
})
export class TemplateColectiveComponent implements OnInit {
    @Input() parentForm: FormGroup;
    @Input() question: Question;
    @Input() errorMessages;
    @Input() colectives;

    lang: string;

    constructor(
        private languageService: LanguageService,
        private storage: Storage,
        private colectivesService: ColectivesService
    ) {}

    ngOnInit() {
        this.lang = this.languageService.selected;
    }

    // Returns true if the question has an error of errorType and must be shown.
    showingErrors(errorType: string) {
        return (
            this.parentForm.controls[this.question._id].hasError(errorType) &&
            (this.parentForm.controls[this.question._id].dirty ||
                this.parentForm.controls[this.question._id].touched)
        );
    }

    colSelected(e) {
        this.colectivesService.setUserColectives(e.detail.value);
    }
}
