import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup = new FormGroup({})
    hide: boolean = true;
    hide2: boolean = true;
        
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.initForm()
    }

    initForm(): void {
        this.registerForm = this.fb.group({
            first_name: [null, Validators.required],
            last_name: [null, Validators.required],
            email: [null, Validators.required],
            password: [null, Validators.required],
            password2: [null, Validators.required],
        })
    }

    submit(): void {
        if(this.registerForm.value.password != this.registerForm.value.password2) {
            return;
        }

        let form = {
            first_name: this.registerForm.value.first_name,
            last_name: this.registerForm.value.last_name,
            email: this.registerForm.value.email,
            password: this.registerForm.value.password,
        }

        let loginForm = {
            username: this.registerForm.value.email,
            password: this.registerForm.value.password,
        }
        
        this.authService.register(form).subscribe(res => {
            this.authService.login(loginForm).subscribe(res => {
                this.router.navigate(['']).then(() => {
                    window.location.reload();
                });
            })
        })
    }
}