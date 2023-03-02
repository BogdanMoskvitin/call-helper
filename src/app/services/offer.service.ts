import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOffer } from 'src/app/models/offer.interface';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
    constructor(private http: HttpClient) {}

    getOffersReceivedList(idOrganisation: number, filter?: {param: string, value: string}): Observable<IOffer[]> {
        let queryParams = {};
        if(filter != undefined) {
            queryParams = new HttpParams().append(filter.param, filter.value);
        }
        return this.http.get<IOffer[]>(environment.api + 'organisations/' + idOrganisation + '/offers/?type=received', {params: queryParams});
    }

    getOffersSentList(idOrganisation: number, filter?: {param: string, value: string}): Observable<IOffer[]> {
        let queryParams = {};
        if(filter != undefined) {
            queryParams = new HttpParams().append(filter.param, filter.value);
        }
        return this.http.get<IOffer[]>(environment.api + 'organisations/' + idOrganisation + '/offers/?type=sent', {params: queryParams});
    }

    addOffer(idOrganisation: number, data: {users: number[]}): Observable<null> {
        return this.http.post<null>(environment.api + 'organisations/' + idOrganisation + '/offers/', data);
    }

    getUsersList(search?: {param: string, value: string}): Observable<IUser[]> {
        let queryParams = new HttpParams();
        if(search != undefined) {
            queryParams = queryParams.set(search.param, search.value)
        }
        return this.http.get<IUser[]>(environment.api + 'users/search/', {params: queryParams});
    }

    acceptOffer(idOrganisation: number, idOffer: number): Observable<null> {
        return this.http.patch<null>(environment.api + 'organisations/' + idOrganisation + '/offers/' + idOffer + '/', {accept: true})
    }

    rejectOffer(idOrganisation: number, idOffer: number): Observable<null> {
        return this.http.patch<null>(environment.api + 'organisations/' + idOrganisation + '/offers/' + idOffer + '/', {accept: false})
    }
}