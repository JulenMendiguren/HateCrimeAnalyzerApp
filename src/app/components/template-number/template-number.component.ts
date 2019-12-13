import { Component, OnInit, Input } from "@angular/core";
import { Question } from "../question.model";
import { FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-template-number",
    templateUrl: "./template-number.component.html",
    styleUrls: ["./template-number.component.scss"]
})

// TODO: Con el slider, no se puede dejar la pregunta sin responder...
export class TemplateNumberComponent implements OnInit {
    @Input() question: Question;
    @Input() parentForm: FormGroup;
    constructor() {}

    ngOnInit() {}
}
