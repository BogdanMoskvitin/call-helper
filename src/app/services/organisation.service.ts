import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrganisation, IOrganisationRequest, IOrganisationResponse } from '../components/models/organisation.interface';

@Injectable({
  providedIn: 'root',
})
export class OrganisationService {
    constructor(private http: HttpClient) {}

    getOrganisationsList(): Observable<IOrganisation[]> {
        return this.http.get<IOrganisation[]>(environment.api + 'organisations/');
    }

    getOrganisation(id: number): Observable<IOrganisation> {
        return this.http.get<IOrganisation>(environment.api + 'organisations/' + id);
    }

    addOrganisation(data: IOrganisationRequest): Observable<IOrganisationResponse> {
        return this.http.post<IOrganisationResponse>(environment.api + 'organisations/', data);
    }

    editOrganisation(id: number, data: IOrganisationRequest): Observable<IOrganisationResponse> {
        return this.http.patch<IOrganisationResponse>(environment.api + 'organisations/' + id, data);
    }
}