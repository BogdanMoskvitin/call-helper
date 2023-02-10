import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrganisationService } from 'src/app/services/organisation.service';
import { IOrganisation } from '../models/organisation.interface';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    organisationsList: IOrganisation[] | null = null;

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
