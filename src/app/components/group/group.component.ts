import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IGroup } from 'src/app/models/group.interface';
import { GroupService } from 'src/app/services/group.service';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
    id!: number;
    group: IGroup | null = null;

    constructor(
        private route: ActivatedRoute,
        private groupService: GroupService,
    ) { }

    ngOnInit(): void {
        this.route.paramMap.pipe(
            switchMap(params => params.getAll('id'))
        )
        .subscribe(data => {
            this.id = +data;
            this.getGroup();
        });
    }

    getGroup(): void {
        this.groupService.getGroup(this.id).subscribe(res => {
            this.group = res;
        })
    }

    openEditGroupDialog(): void {}
}