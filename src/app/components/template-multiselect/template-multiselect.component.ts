import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../question.model';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-template-multiselect',
    templateUrl: './template-multiselect.component.html',
    styleUrls: [
        '../../pages/report/report.page.scss',
        './template-multiselect.component.scss'
    ]
})
export class TemplateMultiselectComponent implements OnInit {
    @Input() question: Question;
    @Input() parentForm: FormGroup;
    @Input() errorMessages;

    constructor() {}

    ngOnInit() {}

    // Returns true if the question has an error of errorType and must be shown.
    showingErrors(errorType: string) {
        return (
            this.parentForm.controls[this.question._id].hasError(errorType) &&
            (this.parentForm.controls[this.question._id].dirty ||
                this.parentForm.controls[this.question._id].touched)
        );
    }
}
