import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOffer } from 'src/app/models/offer.interface';
import { IOrganisation } from '../models/organisation.interface';

@Injectable({
  providedIn: 'root',
})
export class OrganisationsOffersService {
    constructor(private http: HttpClient) {}

    getOrganisationsOffersList(filter?: {param: string, value: string}): Observable<IOffer[]> {
        let queryParams = {};
        if(filter != undefined) {
            queryParams = new HttpParams().append(filter.param, filter.value);
        }
        return this.http.get<IOffer[]>(environment.api + 'organisations/offers/', {params: queryParams});
    }

    addOrganisationsOffers(data: {organisation: number}): Observable<null> {
        return this.http.post<null>(environment.api + 'organisations/offers/', data);
    }

    getOrganisationsList(search?: {param: string, value: string}): Observable<IOrganisation[]> {
        let queryParams = new HttpParams();
        if(search != undefined) {
            queryParams = queryParams.set(search.param, search.value)
        }
        return this.http.get<IOrganisation[]>(environment.api + 'organisations/search/', {params: queryParams});
    }

    acceptOffer(idOffer: number): Observable<null> {
        return this.http.patch<null>(environment.api + 'organisations/offers/' + idOffer + '/', {accept: true})
    }

    rejectOffer(idOffer: number): Observable<null> {
        return this.http.patch<null>(environment.api + 'organisations/offers/' + idOffer + '/', {accept: false})
    }
}