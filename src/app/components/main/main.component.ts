import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.http.get(environment.api + 'users/me/').subscribe(res => {
            console.log(res)
        })
    }
}
