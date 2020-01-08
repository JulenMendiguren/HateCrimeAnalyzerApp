import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../question.model';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-template-yesno',
    templateUrl: './template-yesno.component.html',
    styleUrls: [
        '../../pages/report/report.page.scss',
        './template-yesno.component.scss'
    ]
})
export class TemplateYesnoComponent implements OnInit {
    @Input() question: Question;
    @Input() parentForm: FormGroup;

    constructor() {}

    ngOnInit() {}
}
