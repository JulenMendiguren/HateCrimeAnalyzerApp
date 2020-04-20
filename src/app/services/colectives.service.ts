import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root',
})
export class ColectivesService {
    public userColectives = ['all'];
    public allColectives = [];
    constructor(private storage: Storage) {}

    setUserColectives(selectedColectives) {
        let userCol = ['all'];
        userCol = userCol.concat(selectedColectives);
        this.userColectives = userCol;

        this.storage.set('userCol', userCol);
    }

    loadColectivesFromStorage() {
        this.storage.get('userCol').then((c) => {
            if (c) {
                this.userColectives = c;
            }
        });

        this.storage.get('allColectives').then((c) => {
            if (c) {
                this.allColectives = c;
            }
        });
    }
    setAllColectives(col) {
        this.allColectives = col;
        this.storage.set('allColectives', col);
    }
}
