import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    isAuthenticated: boolean = false;

    constructor(
        private authService: AuthService, 
        private router: Router,
    ) {}

    ngOnInit(): void {
        const potentialToken = localStorage.getItem('auth-token')
        if(potentialToken !== null) {
            this.authService.setToken(potentialToken);
        }

        this.isAuthenticated = this.authService.isAuthenticated();
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['./login']);
    }
}
