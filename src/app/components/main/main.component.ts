import { Component, OnInit } from '@angular/core';
import { mockChart } from '../chart/chart.mock';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    mockChart = mockChart;
    constructor() { }

    ngOnInit(): void { }
}