import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEmployee, IEmployeeRequest, IEmployeeResponse } from '../components/models/employee.interface';
import { IPosition } from '../components/models/position.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
    constructor(private http: HttpClient) {}

    getEmployeesList(idOrganisation: number, filter?: {param: string, value: boolean}, search?: {param: string, value: string}): Observable<IEmployee[]> {
        let queryParams = new HttpParams();
        if(filter != undefined) {
            queryParams = queryParams.set(filter.param, filter.value)
        }
        if(search != undefined) {
            queryParams = queryParams.set(search.param, search.value)
        }
        return this.http.get<IEmployee[]>(environment.api + 'organisations/' + idOrganisation + '/employees/', {params: queryParams});
    }

    addEmployee(data: IEmployeeRequest, idOrganisation: number): Observable<IEmployeeResponse> {
        return this.http.post<IEmployeeResponse>(environment.api + 'organisations/' + idOrganisation + '/employees/', data);
    }

    getPositions(): Observable<IPosition[]> {
        return this.http.get<IPosition[]>(environment.api + 'organisations/dicts/positions/');
    }
}