import { Component, OnInit, Input } from "@angular/core";
import { Question } from "../question.model";

@Component({
    selector: "app-template-radio",
    templateUrl: "./template-radio.component.html",
    styleUrls: ["./template-radio.component.scss"]
})
export class TemplateRadioComponent implements OnInit {
    @Input() question: Question;
    constructor() {}

    ngOnInit() {}
}
