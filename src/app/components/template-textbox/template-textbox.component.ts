import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../question.model';
import { FormGroup } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';

@Component({
    selector: 'app-template-textbox',
    templateUrl: './template-textbox.component.html',
    styleUrls: [
        '../../pages/report/report.page.scss',
        './template-textbox.component.scss',
    ],
})
export class TemplateTextboxComponent implements OnInit {
    @Input() question: Question;
    @Input() parentForm: FormGroup;
    @Input() errorMessages;

    lang: string;

    constructor(private languageService: LanguageService) {}

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
}
