import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage';
@Injectable({
    providedIn: 'root'
})
export class UserAResolverService implements Resolve<any> {
    constructor(private storage: Storage) {}

    resolve() {
        return this.storage.get('userA');
    }
}
