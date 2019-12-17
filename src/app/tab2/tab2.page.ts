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
    public jsonLoaded = false;
    public parentForm: FormGroup;
    public errorMessages = {};

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
            let questionErrors = [];
            let defaultValue = null;

            if (question.options.required == true) {
                questionValidators.push(Validators.required);
                questionErrors.push({
                    type: "required",
                    message: "This field is required"
                });
            }
            if (question.type == "number") {
                if (question.options.slider) {
                    defaultValue =
                        (question.options.minValue +
                            question.options.maxValue) /
                        2;
                } else {
                    questionValidators.push(Validators.pattern("[0-9]+"));
                    questionErrors.push({
                        type: "pattern",
                        message: "Please enter a number"
                    });
                }
            }
            // Length
            if (!!question.options.minLength) {
                questionValidators.push(
                    Validators.minLength(question.options.minLength)
                );
                questionErrors.push({
                    type: "minlength",
                    message: `This field needs to be at least ${question.options.minLength} characters long`
                });
            }
            if (!!question.options.maxLength) {
                questionValidators.push(
                    Validators.maxLength(question.options.maxLength)
                );
                questionErrors.push({
                    type: "maxlength",
                    message: `This field can't be more than ${question.options.maxLength} characters long`
                });
            }

            // Value
            if (!!question.options.minValue) {
                questionValidators.push(
                    Validators.min(question.options.minValue)
                );
                questionErrors.push({
                    type: "min",
                    message: `The minimum value of this field is ${question.options.minValue}.`
                });
            }
            if (!!question.options.maxValue) {
                questionValidators.push(
                    Validators.max(question.options.maxValue)
                );
                questionErrors.push({
                    type: "max",
                    message: `The maximum value of this field is ${question.options.maxValue}.`
                });
            }

            const fc = new FormControl(defaultValue, questionValidators);
            formGroupSpec[question.Q_ID] = fc;
            this.errorMessages[question.Q_ID] = questionErrors;
        });

        this.parentForm = this.fb.group(formGroupSpec);
        console.log(this.parentForm.value);

        this.parentForm.valueChanges.subscribe(newVal => console.log(newVal));
        this.parentForm.statusChanges.subscribe(newStatus =>
            console.log(newStatus)
        );
    }

    public findInvalidControls() {
        const invalid = [];
        const controls = this.parentForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
                invalid.push(controls[name].errors);
            }
        }
        console.log(invalid);
    }
}
