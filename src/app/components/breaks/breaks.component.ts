import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBreak } from 'src/app/models/break.interface';
import { IGroup } from 'src/app/models/group.interface';
import { IMember } from 'src/app/models/member.interface';
import { BreakService } from 'src/app/services/break.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
    selector: 'app-breaks',
    templateUrl: './breaks.component.html',
    styleUrls: ['./breaks.component.scss']
})
export class BreaksComponent implements OnInit {
    displayedColumns: string[] = ['date', 'time', 'break_max_duration', 'min_active', 'stats'];
    breaksList: IBreak[] = [];
    page: number = 1;
    page_size: number = 10;

    @Input()
    group: IGroup | null = null;

    constructor(
        public dialog: MatDialog,
        private breakService: BreakService,
    ) { }

    ngOnInit(): void {
        this.getBreaksList();
    }

    getBreaksList(): void {
        if(this.group) {
            this.breakService.getBreaksList(this.group.id, this.page, this.page_size).subscribe(res => {
                this.breaksList = res.results;
            })
        }
    }

    openAddGroupDialog(): void {
        if(this.group) {
            const dialogRef = this.dialog.open(AddBreakDialogComponent, {data: this.group});
        
            dialogRef.afterClosed().subscribe(() => {
                this.getBreaksList()
            });
        }
    }

    filter(status: string) {
        if(this.group) {
            if(status == 'active') {
                this.breakService.getBreaksList(this.group.id, this.page, this.page_size, {param: 'category', value: status}).subscribe(res => {
                    this.breaksList = res.results;
                })
            } else if(status == 'future') {
                this.breakService.getBreaksList(this.group.id, this.page, this.page_size, {param: 'category', value: status}).subscribe(res => {
                    this.breaksList = res.results;
                })
            } else if(status == 'archive') {
                this.breakService.getBreaksList(this.group.id, this.page, this.page_size, {param: 'category', value: status}).subscribe(res => {
                    this.breaksList = res.results;
                })
            } else if(status == '') {
                this.breakService.getBreaksList(this.group.id, this.page, this.page_size).subscribe(res => {
                    this.breaksList = res.results;
                })
            }
        }
    }
}

@Component({
    selector: 'add-break-dialog',
    templateUrl: './add-break-dialog.html',
    styleUrls: ['./breaks.component.scss']
})
export class AddBreakDialogComponent implements OnInit {
    breakForm: FormGroup = new FormGroup({});

    today = new Date();
    month = this.today.getMonth();
    year = this.today.getFullYear();
    day = this.today.getDate() + 1;

    membersList: IMember[] = [];
    selectedMembersList: IMember[] = [];
    page: number = 1;
    page_size: number = 10;

    constructor(
        public dialogRef: MatDialogRef<AddBreakDialogComponent>,
        private fb: FormBuilder,
        private breakService: BreakService,
        private memberService: MemberService,
        @Inject(MAT_DIALOG_DATA) public data: IGroup,
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.getMembersList();
    }

    initForm(): void {
        this.breakForm = this.fb.group({
            group: this.data.id,
            date: new Date(this.year, this.month, this.day),
            break_start: this.data.breaks_info.break_start.slice(0, -3),
            break_end: this.data.breaks_info.break_end.slice(0, -3),
            break_max_duration: this.data.breaks_info.break_max_duration,
            min_active: this.data.breaks_info.min_active,
            members: null,
            all_group_members: true,
            remember_default_data: true,
        })
    }

    submit(): void {
        this.breakService.addBreak(this.breakForm.value).subscribe()
        this.dialogRef.close();
    }

    getMembersList(): void {
        this.memberService.getMembersList(this.data.id, this.page, this.page_size).subscribe(res => {
            this.membersList = res.results;
        })
    }
}