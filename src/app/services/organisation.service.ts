import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrganisation, IOrganisationRequest, IOrganisationResponse } from '../components/models/organisation.interface';

@Injectable({
  providedIn: 'root',
})
export class OrganisationService {
    constructor(private http: HttpClient) {}

    getOrganisationsList(filter?: boolean): Observable<IOrganisation[]> {
        let queryParams = {};
        if(filter != undefined) {
            queryParams = new HttpParams().append("can_manage",filter);
        }
        return this.http.get<IOrganisation[]>(environment.api + 'organisations/', {params: queryParams});
    }

    getOrganisation(id: number): Observable<IOrganisation> {
        return this.http.get<IOrganisation>(environment.api + 'organisations/' + id + '/');
    }

    addOrganisation(data: IOrganisationRequest): Observable<IOrganisationResponse> {
        return this.http.post<IOrganisationResponse>(environment.api + 'organisations/', data);
    }

    editOrganisation(id: number, data: IOrganisationRequest): Observable<IOrganisationResponse> {
        return this.http.patch<IOrganisationResponse>(environment.api + 'organisations/' + id + '/', data);
    }
}