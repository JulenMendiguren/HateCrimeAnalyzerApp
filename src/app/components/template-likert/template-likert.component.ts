import { Component, OnInit, Input } from "@angular/core";
import { Question } from "../question.model";
import { FormGroup } from "@angular/forms";

@Component({
    selector: "app-template-likert",
    templateUrl: "./template-likert.component.html",
    styleUrls: ["./template-likert.component.scss"]
})
export class TemplateLikertComponent implements OnInit {
    @Input() question: Question;
    @Input() parentForm: FormGroup;

    constructor() {}

    ngOnInit() {}
}
