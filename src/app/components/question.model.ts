import { Options } from './options.model';

export interface Question {
    _id: string;
    text: string;
    category: string;
    type: string;
    possibleAnswers: string[];
    options: Options;
}
