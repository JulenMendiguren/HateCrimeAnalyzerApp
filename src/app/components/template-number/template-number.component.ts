import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../question.model';
import { FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-template-number',
    templateUrl: './template-number.component.html',
    styleUrls: [
        '../../pages/report/report.page.scss',
        './template-number.component.scss'
    ]
})

// TODO: Con el slider, no se puede dejar la pregunta sin responder...
export class TemplateNumberComponent implements OnInit {
    @Input() question: Question;
    @Input() parentForm: FormGroup;
    @Input() errorMessages;

    constructor() {}

    ngOnInit() {}

    // Returns true if the question has an error of errorType and must be shown.
    showingErrors(errorType: string) {
        return (
            this.parentForm.controls[this.question.Q_ID].hasError(errorType) &&
            (this.parentForm.controls[this.question.Q_ID].dirty ||
                this.parentForm.controls[this.question.Q_ID].touched)
        );
    }

    // If its a subquestion, it will be shown or not, depending on the parent question.
    showingSubquestion() {
        if (!this.question.options.subquestionOf) {
            return;
        }
        return this.parentForm.controls[this.question.options.subquestionOf]
            .valid
            ? { display: 'block' }
            : { display: 'none' };
    }
}
