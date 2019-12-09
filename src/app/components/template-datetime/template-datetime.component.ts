import { Component, OnInit, Input } from "@angular/core";
import { Question } from "../question.model";

@Component({
    selector: "app-template-datetime",
    templateUrl: "./template-datetime.component.html",
    styleUrls: ["./template-datetime.component.scss"]
})
export class TemplateDatetimeComponent implements OnInit {
    @Input() question: Question;
    constructor() {}

    ngOnInit() {}
}
