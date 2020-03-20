import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';
@Injectable({
    providedIn: 'root'
})
export class UserQResolverService implements Resolve<any> {
    constructor(private storage: Storage, private api: ApiService) {}

    resolve(route: ActivatedRouteSnapshot) {
        if (route.paramMap.get('update')) {
            console.log('Update!');
            // TODO: fetch from server
            return this.api.getLastUserQ();
        } else {
            return this.storage.get('userQ');
        }
    }
}
