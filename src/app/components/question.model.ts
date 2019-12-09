import { Options } from "./options.model";

export interface Question {
    Q_ID: string;
    text: string;
    category: string;
    type: string;
    possibleAnswers: string[];
    options: Options;
}
