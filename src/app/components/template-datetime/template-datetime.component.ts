import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../question.model';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-template-datetime',
    templateUrl: './template-datetime.component.html',
    styleUrls: [
        '../../pages/report/report.page.scss',
        './template-datetime.component.scss'
    ]
})
export class TemplateDatetimeComponent implements OnInit {
    @Input() question: Question;
    @Input() parentForm: FormGroup;
    @Input() errorMessages;

    datetimeFormat;

    constructor() {}

    ngOnInit() {
        switch (this.question.options.datetimeFormat) {
            case 'date':
                this.datetimeFormat = 'D MMM YYYY';
                break;
            case 'time':
                this.datetimeFormat = 'HH:mm';
                break;
            default:
                this.datetimeFormat = 'D MMM YYYY HH:mm';
                break;
        }
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
