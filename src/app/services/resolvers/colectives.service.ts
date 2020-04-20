import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from '../api.service';

@Injectable({
    providedIn: 'root',
})
export class ColectivesResolverService implements Resolve<any> {
    constructor(private api: ApiService) {}

    resolve() {
        return this.api.getAllColectives();
    }
}
