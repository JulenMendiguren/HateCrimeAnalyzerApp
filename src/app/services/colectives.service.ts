import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root',
})
export class ColectivesService {
    public userColectives = ['all'];
    constructor(private storage: Storage) {}

    setUserColectives(selectedColectives) {
        let userCol = ['all'];
        userCol = userCol.concat(selectedColectives);
        this.userColectives = userCol;

        this.storage.set('userCol', userCol);
    }

    loadUserColectivesFromStorage() {
        this.storage.get('userCol').then((c) => {
            if (c) {
                this.userColectives = c;
            }
        });
    }
}
