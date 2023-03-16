import { Component, OnInit } from '@angular/core';
import { IBreak } from 'src/app/models/break.interface';
import { BreakService } from 'src/app/services/break.service';

@Component({
    selector: 'app-my-breaks',
    templateUrl: './my-breaks.component.html',
    styleUrls: ['./my-breaks.component.scss']
})
export class MyBreaksComponent implements OnInit {
    displayedColumns: string[] = ['date', 'time', 'break_max_duration', 'group', 'organisation', 'min_active', 'stats'];
    breaksList: IBreak[] = [];
    page: number = 1;
    page_size: number = 10;

    constructor(
        private breakService: BreakService,
    ) { }

    ngOnInit(): void {
        this.getMyBreaksList();
    }

    getMyBreaksList(): void {
        this.breakService.getMyBreaksList(this.page, this.page_size).subscribe(res => {
            this.breaksList = res.results;
        })
    }

    filter(status: string) {
        if(status == 'active') {
            this.breakService.getMyBreaksList(this.page, this.page_size, {param: 'category', value: status}).subscribe(res => {
                this.breaksList = res.results;
            })
        } else if(status == 'future') {
            this.breakService.getMyBreaksList(this.page, this.page_size, {param: 'category', value: status}).subscribe(res => {
                this.breaksList = res.results;
            })
        } else if(status == 'archive') {
            this.breakService.getMyBreaksList(this.page, this.page_size, {param: 'category', value: status}).subscribe(res => {
                this.breaksList = res.results;
            })
        } else if(status == '') {
            this.breakService.getMyBreaksList(this.page, this.page_size).subscribe(res => {
                this.breaksList = res.results;
            })
        }
    }
}
