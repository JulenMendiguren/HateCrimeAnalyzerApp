import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public fullJson: any
  public questions: []
  public jsonLoaded: boolean = false;
  constructor() { }

  ionViewDidEnter() {
    this.load();
  }

  load() {
    fetch('/assets/test.json').then(file => {
      return file.json()
    }).then(json => {
      this.fullJson = json;
      this.questions = this.fullJson.questions;
      this.jsonLoaded = true;
    }
    )

  }
}
