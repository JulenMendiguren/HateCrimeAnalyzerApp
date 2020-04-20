import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ip } from './ip.js';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    getLastUserQ() {
        let url = 'http://' + ip + '/api/questionnaire/last/user';
        console.log(url);
        return this.http.get(url);
    }

    getLastReportQ() {
        let url = 'http://' + ip + '/api/questionnaire/last/report';
        console.log(url);
        return this.http.get(url);
    }

    getAllColectives() {
        let url = 'http://' + ip + '/api/colective/all';
        console.log(url);
        return this.http.get(url);
    }

    postReport(reportJSON) {
        let url = 'http://' + ip + '/api/answer/one';
        console.log(url);

        let statusObserve = { observe: 'request' };

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            statusObserve,
        };

        return this.http.post(url, reportJSON, httpOptions);
    }
}
