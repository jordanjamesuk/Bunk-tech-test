import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iTraveller } from '../shared/shared.interfaces';
import { Observable } from 'rxjs';
/**
 * SettleUpService.
 */
@Injectable({ providedIn: 'root' })
export class SettleUpService {
    constructor(private http: HttpClient) {}

    /**
     * settleUp - Post request to /payouts endpoint.
     *
     * @param {Object} postData - list of traveller expenses
     * @returns {Observable<any>}
     */
    settleUp(postData: { expenses: iTraveller[] }): Observable<any> {
        return this.http.post('http://localhost:3000/payouts', postData, {
            headers: { 'content-type': 'application/json' },
        });
    }
}
