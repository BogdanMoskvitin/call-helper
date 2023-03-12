import { Component, OnInit, Input } from '@angular/core';
import { IMember } from 'src/app/models/member.interface';
import { MemberService } from 'src/app/services/member.service';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
    displayedColumns: string[] = ['name', 'position', 'dateJoined'];
    membersList: IMember[] = [];
    page: number = 1;
    page_size: number = 10;

    @Input()
    idGroup!: number;

    constructor(private memberService: MemberService) { }

    ngOnInit(): void {
        this.getMembersList();
    }

    getMembersList(): void {
        this.memberService.getMembersList(this.idGroup, this.page, this.page_size).subscribe(res => {
            this.membersList = res.results;
        })
    }
}