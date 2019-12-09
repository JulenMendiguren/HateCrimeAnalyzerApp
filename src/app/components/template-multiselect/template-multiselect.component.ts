import { Component, OnInit, Input } from "@angular/core";
import { Question } from "../question.model";

@Component({
    selector: "app-template-multiselect",
    templateUrl: "./template-multiselect.component.html",
    styleUrls: ["./template-multiselect.component.scss"]
})
export class TemplateMultiselectComponent implements OnInit {
    @Input() question: Question;
    constructor() {}

    ngOnInit() {}
}
