import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { OrganisationService } from 'src/app/services/organisation.service';
import { IOrganisation } from '../models/organisation.interface';

@Component({
    selector: 'app-organisation',
    templateUrl: './organisation.component.html',
    styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent implements OnInit {
    id: number | null = null;
    organisation: IOrganisation | null = null;

    constructor(
        private route: ActivatedRoute,
        private organisationService: OrganisationService,
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.route.paramMap.pipe(
            switchMap(params => params.getAll('id'))
        )
        .subscribe(data => {
            this.id = +data;
            this.getOrganisation()
        });
    }

    getOrganisation(): void {
        if(this.id) {
            this.organisationService.getOrganisation(this.id).subscribe(res => {
                this.organisation = res;
            })
        }
    }

    openEditOrganisationDialog(): void {
        if(this.organisation?.can_manage) {
            const dialogRef = this.dialog.open(EditOrganisationDialogComponent, {data: this.id});
    
            dialogRef.afterClosed().subscribe(() => {
                this.getOrganisation()
            });
        }
    }
}

@Component({
    selector: 'edit-organisation-dialog',
    templateUrl: './edit-organisation-dialog.html',
})
export class EditOrganisationDialogComponent implements OnInit {
    organisationForm: FormGroup = new FormGroup({});

    constructor(
        public dialogRef: MatDialogRef<EditOrganisationDialogComponent>,
        private fb: FormBuilder,
        private organisationService: OrganisationService,
        @Inject(MAT_DIALOG_DATA) public data: number,
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.organisationForm = this.fb.group({
            name: [null, Validators.required],
        })
    }

    submit(): void {
        this.organisationService.editOrganisation(this.data, this.organisationForm.value).subscribe()
        this.dialogRef.close();
    }
}