import { Component, OnInit, Input } from "@angular/core";
import { Question } from "../question.model";
import { FormGroup } from "@angular/forms";

@Component({
    selector: "app-template-multiselect",
    templateUrl: "./template-multiselect.component.html",
    styleUrls: ["./template-multiselect.component.scss"]
})
export class TemplateMultiselectComponent implements OnInit {
    @Input() question: Question;
    @Input() parentForm: FormGroup;

    constructor() {}

    ngOnInit() {}
}
