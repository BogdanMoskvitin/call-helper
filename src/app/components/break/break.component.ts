import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { IBreak } from 'src/app/models/break.interface';
import { BreakService } from 'src/app/services/break.service';
import { ISchedule } from 'src/app/models/schedule.interface';

@Component({
    selector: 'app-break',
    templateUrl: './break.component.html',
    styleUrls: ['./break.component.scss']
})
export class BreakComponent implements OnInit {
    id!: number;
    break: IBreak | null = null;
    schedule: ISchedule[] | null = null;

    constructor(
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private breakService: BreakService,
    ) { }

    ngOnInit(): void {
        this.route.paramMap.pipe(
            switchMap(params => params.getAll('id'))
        )
        .subscribe(data => {
            this.id = +data;
            this.getBreak();
            this.getSchedule();
        });
    }

    getBreak(): void {
        this.breakService.getBreak(this.id).subscribe(res => {
            this.break = res;
        })
    }

    getSchedule(): void {
        this.breakService.getSchedule(this.id).subscribe(res => {
            this.schedule = res;
        })
    }

    changeStatusMember(status: string): void {
        this.breakService.changeStatusMember(this.id, status).subscribe(res => {
            this.getSchedule();
        })
    }

    changeStatusBreak(status: string): void {
        this.breakService.changeStatusBreak(this.id, status).subscribe(res => {
            this.getSchedule();
        })
    }

    openCreateBreakDialog(status: string): void {
        const dialogRef = this.dialog.open(BreakDialogComponent, {data: {id: this.id, status}});
        
            dialogRef.afterClosed().subscribe(() => {
                this.getSchedule();
            });
    }
}

@Component({
    selector: 'break-dialog',
    templateUrl: './break-dialog.html',
    styleUrls: ['./break.component.scss']
})
export class BreakDialogComponent implements OnInit {
    breakForm: FormGroup = new FormGroup({});

    page: number = 1;
    page_size: number = 10;

    constructor(
        public dialogRef: MatDialogRef<BreakDialogComponent>,
        private fb: FormBuilder,
        private breakService: BreakService,
        @Inject(MAT_DIALOG_DATA) public data: {id: number, status: string},
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.breakForm = this.fb.group({
            break_start: null,
            break_end: null,
            id: this.data.id,
            status: this.data.status,
        })
    }

    submit(): void {
        if(this.data.status == 'create') {
            this.breakService.createBreak(this.breakForm.value).subscribe()
        }
        if(this.data.status == 'update') {
            this.breakService.updateBreak(this.breakForm.value).subscribe()
        }
        this.dialogRef.close();
    }
}