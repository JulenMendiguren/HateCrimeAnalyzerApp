import { Options } from './options.model';

export interface Question {
    _id: string;
    text_eu: string;
    text_es: string;
    text_en: string;
    text_fr: string;
    category: string;
    type: string;
    possibleAnswers: string[];
    options: Options;
}
