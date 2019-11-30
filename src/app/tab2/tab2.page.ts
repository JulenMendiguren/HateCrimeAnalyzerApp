import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  test: any
  constructor() { }

  ionViewDidEnter() {
    this.load();
  }

  load() {
    console.log("asdasdasd")

    fetch('./test.json').then(file => {
      return file.json()
    }).then(json => {
      this.test = json;
      console.log(this.test)
    }
    )

  }
}
