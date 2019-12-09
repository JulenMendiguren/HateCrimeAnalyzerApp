import { Component, OnInit, Input } from "@angular/core";
import { Question } from "../question.model";

@Component({
    selector: "app-template-yesno",
    templateUrl: "./template-yesno.component.html",
    styleUrls: ["./template-yesno.component.scss"]
})
export class TemplateYesnoComponent implements OnInit {
    @Input() question: Question;
    constructor() {}

    ngOnInit() {}
}
