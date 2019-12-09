import { Component } from "@angular/core";
import { Question } from "../components/question.model";

@Component({
    selector: "app-tab2",
    templateUrl: "tab2.page.html",
    styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
    public questions: Question[] = [];
    public jsonLoaded: boolean = false;
    constructor() {}

    ionViewDidEnter() {
        this.load();
    }

    load() {
        fetch("/assets/test.json")
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
}
