import { Component, OnInit, Input } from "@angular/core";
import { Question } from "../question.model";
import { FormGroup } from "@angular/forms";

@Component({
    selector: "app-template-textbox",
    templateUrl: "./template-textbox.component.html",
    styleUrls: ["./template-textbox.component.scss"]
})
export class TemplateTextboxComponent implements OnInit {
    @Input() question: Question;
    @Input() parentForm: FormGroup;

    constructor() {}

    ngOnInit() {}
}
