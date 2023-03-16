import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { IGroup } from 'src/app/models/group.interface';

@Component({
    selector: 'app-my-groups',
    templateUrl: './my-groups.component.html',
    styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit {
    displayedColumns: string[] = ['name', 'manager', 'organisation', 'pax', 'created_at'];
    groupsList: IGroup[] = [];
    filters = {
        all: true,
        my: false,
        managed: false,
    }

    constructor(
        private groupService: GroupService,
    ) { }

    ngOnInit(): void {
        this.getMyGroupsList();
    }

    getMyGroupsList() {
        this.groupService.getMyGroupsList().subscribe(res => {
            this.groupsList = res;
        })
    }

    filter(status: string) {
        if(status == 'all') {
            this.groupService.getMyGroupsList().subscribe(res => {
                this.groupsList = res
            })
            this.filters = {
                all: true,
                my: false,
                managed: false,
            }
        } else if(status == 'my') {
            this.groupService.getMyGroupsList({param: 'is_member', value: true}).subscribe(res => {
                this.groupsList = res
            })
            this.filters = {
                all: false,
                my: true,
                managed: false,
            }
        } else if(status == 'managed') {
            this.groupService.getMyGroupsList({param: 'can_manage', value: true}).subscribe(res => {
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
