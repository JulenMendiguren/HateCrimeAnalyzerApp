import { Injectable } from "@angular/core";
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl
} from "@angular/forms";
import { Question } from "../components/question.model";

@Injectable({
    providedIn: "root"
})
export class ValidationService {
    constructor(private fb: FormBuilder) {}

    setValidators(questions: Question[]) {
        let formGroupData = {};
        let parentForm;
        let errorMessages = {};

        questions.forEach(question => {
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
            // Length (no funciona con numbers)
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
            formGroupData[question.Q_ID] = fc;
            errorMessages[question.Q_ID] = questionErrors;
        });

        parentForm = this.fb.group(formGroupData);
        console.log(parentForm.value);

        parentForm.valueChanges.subscribe(newVal => console.log(newVal));
        parentForm.statusChanges.subscribe(newStatus => console.log(newStatus));

        return [parentForm, errorMessages];
    }
}
