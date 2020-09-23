import { Injectable } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
} from '@angular/forms';
import { Question } from '../components/question.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class ValidationService {
    constructor(private fb: FormBuilder, private translate: TranslateService) {}

    setValidators(questions: Question[]) {
        let formGroupData = {};
        let parentForm;
        let errorMessages = {};

        questions.forEach((question) => {
            let questionValidators = [];
            let questionErrors = [];
            let defaultValue = null;

            if (question.options.required == true) {
                questionValidators.push(Validators.required);
                this.translate
                    .get('error_messages.required')
                    .subscribe((msg: string) => {
                        questionErrors.push({
                            type: 'required',
                            message: msg,
                        });
                    });
            }
            if (question.type == 'number') {
                if (question.options.slider) {
                    defaultValue =
                        (question.options.minValue +
                            question.options.maxValue) /
                        2;
                    defaultValue = Math.floor(defaultValue);
                } else {
                    questionValidators.push(Validators.pattern('[0-9]+'));
                    this.translate
                        .get('error_messages.pattern_number')
                        .subscribe((msg: string) => {
                            questionErrors.push({
                                type: 'pattern',
                                message: msg,
                            });
                        });
                }
            }
            // Length (no funciona con numbers)
            if (!!question.options.minLength) {
                questionValidators.push(
                    Validators.minLength(question.options.minLength)
                );
                this.translate
                    .get('error_messages.minLength', {
                        value: question.options.minLength,
                    })
                    .subscribe((msg: string) => {
                        questionErrors.push({
                            type: 'minlength',
                            message: msg,
                        });
                    });
            }
            if (!!question.options.maxLength) {
                questionValidators.push(
                    Validators.maxLength(question.options.maxLength)
                );
                this.translate
                    .get('error_messages.maxLength', {
                        value: question.options.maxLength,
                    })
                    .subscribe((msg: string) => {
                        questionErrors.push({
                            type: 'maxlength',
                            message: msg,
                        });
                    });
            }

            // Value
            if (!!question.options.minValue) {
                questionValidators.push(
                    Validators.min(question.options.minValue)
                );
                this.translate
                    .get('error_messages.min', {
                        value: question.options.minValue,
                    })
                    .subscribe((msg: string) => {
                        questionErrors.push({
                            type: 'min',
                            message: msg,
                        });
                    });
            }
            if (!!question.options.maxValue) {
                questionValidators.push(
                    Validators.max(question.options.maxValue)
                );
                this.translate
                    .get('error_messages.max', {
                        value: question.options.maxValue,
                    })
                    .subscribe((msg: string) => {
                        questionErrors.push({
                            type: 'max',
                            message: msg,
                        });
                    });
            }

            const fc = new FormControl(defaultValue, questionValidators);
            formGroupData[question._id] = fc;
            errorMessages[question._id] = questionErrors;
        });

        parentForm = this.fb.group(formGroupData);
        console.log(parentForm.value);

        // parentForm.valueChanges.subscribe((newVal) => console.log(newVal));

        return [parentForm, errorMessages];
    }
}
