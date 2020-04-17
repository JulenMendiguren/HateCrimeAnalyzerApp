import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../question.model';
import { FormGroup } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';

@Component({
    selector: 'app-template-radio',
    templateUrl: './template-radio.component.html',
    styleUrls: [
        '../../pages/report/report.page.scss',
        './template-radio.component.scss',
    ],
})
export class TemplateRadioComponent implements OnInit {
    @Input() question: Question;
    @Input() parentForm: FormGroup;

    lang: string;

    constructor(private languageService: LanguageService) {}

    ngOnInit() {
        this.lang = this.languageService.selected;
    }
}
