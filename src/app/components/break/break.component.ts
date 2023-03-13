import { Component, OnInit } from '@angular/core';
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

    openEditBreakDialog(): void {}

    getSchedule(): void {
        this.breakService.getSchedule(this.id).subscribe(res => {
            this.schedule = res;
        })
    }
}