import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMembersList } from '../models/member.interface';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
    constructor(private http: HttpClient) {}

    getMembersList(idGroup: number, page: number, page_size: number): Observable<IMembersList> {
        let queryParams = {};
        queryParams = new HttpParams().append('page', page).append('page_size', page_size);
        return this.http.get<IMembersList>(environment.api + 'organisations/groups/' + idGroup + '/members/', {params: queryParams});
    }
}