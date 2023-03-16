import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGroup, IGroupRequest, IGroupResponse } from 'src/app/models/group.interface';
import { IManager } from 'src/app/models/manager.interface';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
    constructor(private http: HttpClient) {}

    getGroupsList(idOrganisation: number, filter?: {param: string, value: boolean}): Observable<IGroup[]> {
        let queryParams = {};
        if(filter != undefined) {
            queryParams = new HttpParams().append(filter.param, filter.value);
        }
        return this.http.get<IGroup[]>(environment.api + 'organisations/groups/?organisation=' + idOrganisation, {params: queryParams});
    }

    getMyGroupsList(filter?: {param: string, value: boolean}): Observable<IGroup[]> {
        let queryParams = {};
        if(filter != undefined) {
            queryParams = new HttpParams().append(filter.param, filter.value);
        }
        return this.http.get<IGroup[]>(environment.api + 'organisations/groups/', {params: queryParams});
    }

    getGroup(idGroup: number): Observable<IGroup> {
        return this.http.get<IGroup>(environment.api + 'organisations/groups/' + idGroup + '/');
    }

    addGroup(data: IGroupRequest): Observable<IGroupResponse> {
        return this.http.post<IGroupResponse>(environment.api + 'organisations/groups/', data);
    }

    getManagers(idOrganisation: number): Observable<IManager[]> {
        return this.http.get<IManager[]>(environment.api + 'organisations/' + idOrganisation + '/employees/search/?can_be_group_manager=true');
    }
}