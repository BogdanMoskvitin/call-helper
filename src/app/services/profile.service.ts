import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProfile } from 'src/app/models/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
    constructor(private http: HttpClient) {}

    getProfile(): Observable<IProfile> {
        return this.http.get<IProfile>(environment.api + 'users/me/')
    }

    editProfile(data: any): Observable<IProfile> {
        return this.http.patch<IProfile>(environment.api + 'users/me/', data)
    }
}