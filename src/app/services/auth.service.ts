import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin, IRegister } from '../components/models/auth.interface';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private token: string = '';

    constructor(private http: HttpClient) {}

    login(form: ILogin): Observable<{ access: string }> {
        return this.http
        .post<{ access: string }>(environment.api + 'auth/jwt/create/', form)
        .pipe(
            tap(({ access }) => {
            localStorage.setItem('auth-token', 'Bearer ' + access);
            this.setToken(access);
            })
        );
    }

    register(form: IRegister) {
        return this.http.post(environment.api + 'users/reg/', form);
    }

    setToken(token: string) {
        this.token = token;
    }

    getToken(): string {
        return this.token;
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    logout() {
        this.setToken('');
        localStorage.clear();
    }
}