import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrganisationService } from 'src/app/services/organisation.service';
import { IOrganisation } from 'src/app/models/organisation.interface';

@Component({
    selector: 'app-organisations',
    templateUrl: './organisations.component.html',
    styleUrls: ['./organisations.component.scss']
})
export class OrganisationsComponent implements OnInit {
    displayedColumns: string[] = ['name', 'director', 'pax', 'groups_count', 'created_at'];
    organisationsList: IOrganisation[] = [];

    constructor(
        public dialog: MatDialog,
        private organisationService: OrganisationService,
    ) { }

    ngOnInit(): void {
        this.getOrganisationsList();
    }

    getOrganisationsList() {
        this.organisationService.getOrganisationsList().subscribe(res => {
            this.organisationsList = res;
        })
    }

    openAddOrganisationDialog(): void {
        const dialogRef = this.dialog.open(AddOrganisationDialogComponent);
    
        dialogRef.afterClosed().subscribe(() => {
            this.getOrganisationsList()
        });
    }

    filter(status: string) {
        if(status == 'all') {
            this.organisationService.getOrganisationsList().subscribe(res => {
                this.organisationsList = res
            })
        } else if(status == 'managed') {
            this.organisationService.getOrganisationsList(true).subscribe(res => {
                this.organisationsList = res
            })
        } else if(status == 'convent') {
            this.organisationService.getOrganisationsList(false).subscribe(res => {
                this.organisationsList = res
            })
        }
    }
}

@Component({
  selector: 'add-organisation-dialog',
  templateUrl: './add-organisation-dialog.html',
})
export class AddOrganisationDialogComponent implements OnInit {
    organisationForm: FormGroup = new FormGroup({});

    constructor(
        public dialogRef: MatDialogRef<AddOrganisationDialogComponent>,
        private fb: FormBuilder,
        private organisationService: OrganisationService,
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
        this.organisationService.addOrganisation(this.organisationForm.value).subscribe()
        this.dialogRef.close();
    }
}