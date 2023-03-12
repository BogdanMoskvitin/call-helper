import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBreak, IBreaksList } from '../models/break.interface';

@Injectable({
  providedIn: 'root',
})
export class BreakService {
    constructor(private http: HttpClient) {}

    getBreaksList(idGroup: number, page: number, page_size: number): Observable<IBreaksList> {
        let queryParams = {};
        queryParams = new HttpParams().append('page', page).append('page_size', page_size);
        return this.http.get<IBreaksList>(environment.api + 'breaks/replacements/?group=' + idGroup, {params: queryParams});
    }

    getBreak(idBreak: number): Observable<IBreak> {
        return this.http.get<IBreak>(environment.api + 'breaks/replacements/' + idBreak + '/');
    }
}