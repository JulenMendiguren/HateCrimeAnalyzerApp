import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    constructor(private storage: Storage) {}

    ngOnInit() {
        this.setTestUserQ();
    }
    setTestUserQ() {
        this.loadJson('/assets/userQ.json')
            .then(json => {
                this.storage.set('userQ', json);
            })
            .then(() =>
                this.loadJson('/assets/userA.json').then(json => {
                    this.storage.set('userA', json);
                })
            );
    }

    loadJson(url: string) {
        return fetch(url).then(file => {
            return file.json();
        });
    }
}
