import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage';
@Injectable({
    providedIn: 'root'
})
export class UserQResolverService implements Resolve<any> {
    constructor(private storage: Storage) {}

    resolve(route: ActivatedRouteSnapshot) {
        if (route.paramMap.get('update')) {
            console.log('Update!');
            // TODO: fetch from server
            return this.storage.get('userQ');
        } else {
            return this.storage.get('userQ');
        }
    }
}
