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
    @Input() errorMessages;

    constructor() {}

    ngOnInit() {}

    // Returns true if the question has an error of errorType and must be shown.
    showingErrors(errorType: string) {
        return (
            this.parentForm.controls[this.question.Q_ID].hasError(errorType) &&
            (this.parentForm.controls[this.question.Q_ID].dirty ||
                this.parentForm.controls[this.question.Q_ID].touched)
        );
    }
}
