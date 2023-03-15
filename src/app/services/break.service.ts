import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBreak, IBreakRequest, IBreakResponse, IBreaksList } from '../models/break.interface';
import { ISchedule } from '../models/schedule.interface';

@Injectable({
  providedIn: 'root',
})
export class BreakService {
    constructor(private http: HttpClient) {}

    getBreaksList(
        idGroup: number, 
        page: number, 
        page_size: number, 
        filter?: {param: string, value: string}
    ): Observable<IBreaksList> {
        let queryParams = new HttpParams();
        queryParams = queryParams
            .set('page', page)
            .set('page_size', page_size);
        if(filter != undefined) {
            queryParams = queryParams.set(filter.param, filter.value)
        }
        return this.http.get<IBreaksList>(environment.api + 'breaks/replacements/?group=' + idGroup, {params: queryParams});
    }

    getBreak(idBreak: number): Observable<IBreak> {
        return this.http.get<IBreak>(environment.api + 'breaks/replacements/' + idBreak + '/');
    }

    getSchedule(idBreak: number): Observable<ISchedule[]> {
        return this.http.get<ISchedule[]>(environment.api + 'breaks/replacements/' + idBreak + '/schedule/');
    }

    addBreak(data: IBreakRequest): Observable<IBreakResponse> {
        return this.http.post<IBreakResponse>(environment.api + 'breaks/replacements/', data);
    }
}