import { Component, OnInit, Input } from "@angular/core";
import { Question } from "../question.model";

@Component({
    selector: "app-template-textbox",
    templateUrl: "./template-textbox.component.html",
    styleUrls: ["./template-textbox.component.scss"]
})
export class TemplateTextboxComponent implements OnInit {
    @Input() question: Question;

    constructor() {}

    ngOnInit() {}
}
