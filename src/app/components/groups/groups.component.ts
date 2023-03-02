import { Component, OnInit, Input, Inject, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GroupService } from 'src/app/services/group.service';
import { IGroup } from 'src/app/models/group.interface';
import { IManager } from 'src/app/models/manager.interface';
import { IOrganisation } from 'src/app/models/organisation.interface';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnChanges {
    displayedColumns: string[] = ['name', 'manager', 'pax', 'created_at'];
    groupsList: IGroup[] = [];
    filters = {
        all: true,
        my: false,
        managed: false,
    }

    @Input()
    organisation: IOrganisation | null = null;

    constructor(
        public dialog: MatDialog,
        private groupService: GroupService,
    ) { }

    ngOnInit(): void {}

    ngOnChanges(): void {
        this.getGroupsList();
    }

    getGroupsList() {
        if(this.organisation) {
            this.groupService.getGroupsList(this.organisation.id).subscribe(res => {
                this.groupsList = res;
            })
        }
    }

    openAddGroupDialog(): void {
        if(this.organisation) {
            const dialogRef = this.dialog.open(AddGroupDialogComponent, {data: this.organisation.id});
        
            dialogRef.afterClosed().subscribe(() => {
                this.getGroupsList()
            });
        }
    }

    filter(status: string) {
        if(this.organisation) {
            if(status == 'all') {
                this.groupService.getGroupsList(this.organisation.id).subscribe(res => {
                    this.groupsList = res
                })
                this.filters = {
                    all: true,
                    my: false,
                    managed: false,
                }
            } else if(status == 'my') {
                this.groupService.getGroupsList(this.organisation.id, {param: 'is_member', value: true}).subscribe(res => {
                    this.groupsList = res
                })
                this.filters = {
                    all: false,
                    my: true,
                    managed: false,
                }
            } else if(status == 'managed') {
                this.groupService.getGroupsList(this.organisation.id, {param: 'can_manage', value: true}).subscribe(res => {
                    this.groupsList = res
                })
                this.filters = {
                    all: false,
                    my: false,
                    managed: true,
                }
            }
        }
    }
}

@Component({
  selector: 'add-group-dialog',
  templateUrl: './add-group-dialog.html',
  styleUrls: ['./groups.component.scss']
})
export class AddGroupDialogComponent implements OnInit {
    groupForm: FormGroup = new FormGroup({});
    managersList: IManager[] = [];

    constructor(
        public dialogRef: MatDialogRef<AddGroupDialogComponent>,
        private fb: FormBuilder,
        private groupService: GroupService,
        @Inject(MAT_DIALOG_DATA) public data: number,
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.getManagersList();
    }

    initForm(): void {
        this.groupForm = this.fb.group({
            name: [null, Validators.required],
            manager: [null, Validators.required],
            organisation: [this.data, Validators.required],
        })
    }

    submit(): void {
        this.groupService.addGroup(this.groupForm.value).subscribe()
        this.dialogRef.close();
    }

    getManagersList(): void {
        this.groupService.getManagers(this.data).subscribe(res => {
            this.managersList = res;
        })
    }
}