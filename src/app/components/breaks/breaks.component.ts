import { Component, OnInit, Input } from '@angular/core';
import { IBreak } from 'src/app/models/break.interface';
import { BreakService } from 'src/app/services/break.service';

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
    idGroup!: number;

    constructor(private breakService: BreakService) { }

    ngOnInit(): void {
        this.getBreaksList();
    }

    getBreaksList(): void {
        this.breakService.getBreaksList(this.idGroup, this.page, this.page_size).subscribe(res => {
            this.breaksList = res.results;
        })
    }
}