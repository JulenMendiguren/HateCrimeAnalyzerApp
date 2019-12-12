import { Component } from "@angular/core";

import { Question } from "../components/question.model";
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl
} from "@angular/forms";

@Component({
    selector: "app-tab2",
    templateUrl: "tab2.page.html",
    styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
    public questions: Question[] = [];
    public jsonLoaded: boolean = false;
    public parentForm: FormGroup;

    constructor(private fb: FormBuilder) {}

    ionViewDidEnter() {
        this.loadJson().then(() => this.setValidators());
    }

    // Carga el json con las preguntas, en un futuro llamará al service para hacer una petición http
    loadJson() {
        return fetch("/assets/test.json")
            .then(file => {
                return file.json();
            })
            .then(json => {
                json.questions.forEach(element => {
                    this.questions.push(element);
                });
                this.jsonLoaded = true;
            });
    }

    // Hay que inicializar el FormGroup antes de poder usarlo para un form
    setValidators() {
        var formGroupSpec = {};
        this.questions.forEach(question => {
            let questionValidators = [];

            if (question.options.required) {
                questionValidators.push(Validators.required);
            }
            if (question.type == "number") {
                questionValidators.push(Validators.pattern("[0-9]"));
            }
            // Length
            if (question.options.minLength) {
                questionValidators.push(
                    Validators.minLength(question.options.minLength)
                );
            }
            if (question.options.maxLength) {
                questionValidators.push(
                    Validators.maxLength(question.options.maxLength)
                );
            }

            // Value
            if (question.options.minValue) {
                questionValidators.push(
                    Validators.min(question.options.minValue)
                );
            }
            if (question.options.maxValue) {
                questionValidators.push(
                    Validators.max(question.options.maxValue)
                );
            }

            const fc = new FormControl("", questionValidators);
            formGroupSpec[question.Q_ID] = fc;
        });

        this.parentForm = this.fb.group(formGroupSpec);
        console.log(this.parentForm.value);

        this.parentForm.valueChanges.subscribe(newVal => console.log(newVal));
        this.parentForm.statusChanges.subscribe(newStatus =>
            console.log(newStatus)
        );
    }
}
