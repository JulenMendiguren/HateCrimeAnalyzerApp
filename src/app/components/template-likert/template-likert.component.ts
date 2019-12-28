import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../question.model';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-template-likert',
    templateUrl: './template-likert.component.html',
    styleUrls: [
        '../../pages/report/report.page.scss',
        './template-likert.component.scss'
    ]
})
export class TemplateLikertComponent implements OnInit {
    @Input() question: Question;
    @Input() parentForm: FormGroup;

    constructor() {}

    ngOnInit() {}
}
