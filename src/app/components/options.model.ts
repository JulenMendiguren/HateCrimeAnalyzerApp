export interface Options {
    required: boolean;
    subquestionOf?: string;
    requiredAnswer?: string;
    size?: string;
    minValue?: number;
    maxValue?: number;
    minLength?: number;
    maxLength?: number;
    slider?: boolean;
    datetimeFormat?: string;
}
