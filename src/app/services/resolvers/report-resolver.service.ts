import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from '../api.service';

@Injectable({
    providedIn: 'root',
})
export class ReportResolverService implements Resolve<any> {
    constructor(private api: ApiService) {}

    resolve() {
        return this.api.getLastReportQ();
    }
}
