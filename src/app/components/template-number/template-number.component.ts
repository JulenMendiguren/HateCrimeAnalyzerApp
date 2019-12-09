import { Component, OnInit, Input } from "@angular/core";
import { Question } from "../question.model";

@Component({
    selector: "app-template-number",
    templateUrl: "./template-number.component.html",
    styleUrls: ["./template-number.component.scss"]
})
export class TemplateNumberComponent implements OnInit {
    @Input() question: Question;
    constructor() {}

    ngOnInit() {}
}
