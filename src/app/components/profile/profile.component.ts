import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProfile } from '../models/profile.interface';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    mainProfileForm: FormGroup = new FormGroup({})
    addProfileForm: FormGroup = new FormGroup({})

    data: IProfile | null = null;
        
    constructor(
        private fb: FormBuilder,
        private profileService: ProfileService,
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.profileService.getProfile().subscribe(res => {
            this.data = res;
            this.initValue();
        })
    }

    initForm(): void {
        this.mainProfileForm = this.fb.group({
            first_name: [null],
            last_name: [null],
            email: [null],
            phone_number: [null],
            username: [null],
        })

        this.addProfileForm = this.fb.group({
            telegram_id: [null],
        })
    }

    initValue(): void {
        this.mainProfileForm = this.fb.group({
            first_name: [this.data?.first_name],
            last_name: [this.data?.last_name],
            email: [this.data?.email, Validators.required],
            phone_number: [this.data?.phone_number],
            username: [this.data?.username],
        })

        this.addProfileForm = this.fb.group({
            telegram_id: [this.data?.profile.telegram_id],
        })
    }

    submitMainProfile(): void {
        this.profileService.editProfile(this.mainProfileForm.value).subscribe(res => {
            this.data = res;
        })
    }

    submitAddProfile(): void {
        let form = {
            profile: {
                telegram_id: this.addProfileForm.value.telegram_id,
            }
        }
        this.profileService.editProfile(form).subscribe(res => {
            this.data = res;
        })
    }
}