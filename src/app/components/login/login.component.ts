import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login-service-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup = new FormGroup({});
    hide: boolean = true;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.loginForm = this.fb.group({
            username: [null, Validators.required],
            password: [null, Validators.required],
        });
    }

    submit(): void {
        this.authService.login(this.loginForm.value).subscribe(res => {
            this.router.navigate(['']).then(() => {
                window.location.reload();
            });
        })
    }
}