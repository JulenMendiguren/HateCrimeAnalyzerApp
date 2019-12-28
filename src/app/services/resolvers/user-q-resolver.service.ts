import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Storage } from '@ionic/storage';
@Injectable({
    providedIn: 'root'
})
export class UserQResolverService implements Resolve<any> {
    constructor(private storage: Storage) {}

    resolve() {
        return this.storage.get('userQ');
    }
}
