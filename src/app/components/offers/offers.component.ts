import { Component, OnInit, Input, Inject, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OfferService } from 'src/app/services/offer.service';
import { IOffer } from 'src/app/models/offer.interface';
import { IOrganisation } from 'src/app/models/organisation.interface';
import { IUser } from 'src/app/models/user.interface';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.component.html',
    styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit, OnChanges {
    displayedColumns: string[] = ['user', 'org_accept', 'user_accept', 'created_at', 'accept', 'reject'];
    offersReceivedList: IOffer[] = [];
    offersSentList: IOffer[] = [];
    receivedFilters = {
        all: true,
        unknown: false,
        accept: false,
        reject: false,
    }
    sentFilters = {
        all: true,
        unknown: false,
        accept: false,
        reject: false,
    }

    @Input()
    organisation: IOrganisation | null = null;

    constructor(
        public dialog: MatDialog,
        private offerService: OfferService,
    ) { }

    ngOnInit(): void {}

    ngOnChanges(): void {
        this.getOffersReceivedList();
        this.getOffersSentList();
    }

    getOffersReceivedList() {
        if(this.organisation) {
            this.offerService.getOffersReceivedList(this.organisation.id).subscribe(res => {
                this.offersReceivedList = res;
            })
        }
    }

    getOffersSentList() {
        if(this.organisation) {
            this.offerService.getOffersSentList(this.organisation.id).subscribe(res => {
                this.offersSentList = res;
            })
        }
    }

    openAddOfferDialog(): void {
        if(this.organisation) {
            const dialogRef = this.dialog.open(AddOfferDialogComponent, {data: this.organisation.id});
        
            dialogRef.afterClosed().subscribe(() => {
                this.getOffersReceivedList();
                this.getOffersSentList();
            });
        }
    }

    filterReceived(status: string) {
        if(this.organisation) {
            if(status == 'all') {
                this.offerService.getOffersReceivedList(this.organisation.id).subscribe(res => {
                    this.offersReceivedList = res
                })
                this.receivedFilters = {
                    all: true,
                    unknown: false,
                    accept: false,
                    reject: false,
                }
            } else if(status == 'unknown') {
                this.offerService.getOffersReceivedList(this.organisation.id, {param: 'decision', value: 'unknown'}).subscribe(res => {
                    this.offersReceivedList = res
                })
                this.receivedFilters = {
                    all: false,
                    unknown: true,
                    accept: false,
                    reject: false,
                }
            } else if(status == 'accept') {
                this.offerService.getOffersReceivedList(this.organisation.id, {param: 'decision', value: 'accept'}).subscribe(res => {
                    this.offersReceivedList = res
                })
                this.receivedFilters = {
                    all: false,
                    unknown: false,
                    accept: true,
                    reject: false,
                }
            } else if(status == 'reject') {
                this.offerService.getOffersReceivedList(this.organisation.id, {param: 'decision', value: 'reject'}).subscribe(res => {
                    this.offersReceivedList = res
                })
                this.receivedFilters = {
                    all: false,
                    unknown: false,
                    accept: false,
                    reject: true,
                }
            }
        }
    }

    filterSent(status: string) {
        if(this.organisation) {
            if(status == 'all') {
                this.offerService.getOffersSentList(this.organisation.id).subscribe(res => {
                    this.offersSentList = res
                })
                this.sentFilters = {
                    all: true,
                    unknown: false,
                    accept: false,
                    reject: false,
                }
            } else if(status == 'unknown') {
                this.offerService.getOffersSentList(this.organisation.id, {param: 'decision', value: 'unknown'}).subscribe(res => {
                    this.offersSentList = res
                })
                this.sentFilters = {
                    all: false,
                    unknown: true,
                    accept: false,
                    reject: false,
                }
            } else if(status == 'accept') {
                this.offerService.getOffersSentList(this.organisation.id, {param: 'decision', value: 'accept'}).subscribe(res => {
                    this.offersSentList = res
                })
                this.sentFilters = {
                    all: false,
                    unknown: false,
                    accept: true,
                    reject: false,
                }
            } else if(status == 'reject') {
                this.offerService.getOffersSentList(this.organisation.id, {param: 'decision', value: 'reject'}).subscribe(res => {
                    this.offersSentList = res
                })
                this.sentFilters = {
                    all: false,
                    unknown: false,
                    accept: false,
                    reject: true,
                }
            }
        }
    }

    acceptOffer(idOffer: number): void {
        if(this.organisation) {
            this.offerService.acceptOffer(this.organisation?.id, idOffer).subscribe(() => {
                this.getOffersReceivedList();
                this.getOffersSentList();
            })
        }
    }

    rejectOffer(idOffer: number): void {
        if(this.organisation) {
            this.offerService.rejectOffer(this.organisation?.id, idOffer).subscribe(() => {
                this.getOffersReceivedList();
                this.getOffersSentList();
            })
        }
    }
}

@Component({
  selector: 'add-offer-dialog',
  templateUrl: './add-offer-dialog.html',
  styleUrls: ['./offers.component.scss']
})
export class AddOfferDialogComponent implements OnInit {
    usersList: IUser[] = [];
    currentSearch: {param: string, value: string} | undefined = undefined;
    selectUsers: IUser[] = [];
    selectUsersIds: {users: number[]} = {users: []};
    isValid = false;

    constructor(
        public dialogRef: MatDialogRef<AddOfferDialogComponent>,
        private offerService: OfferService,
        @Inject(MAT_DIALOG_DATA) public data: number,
    ) {}

    ngOnInit(): void { }

    submit(): void {
        this.offerService.addOffer(this.data, this.selectUsersIds).subscribe()
        this.dialogRef.close();
    }

    controlName = new FormControl();

    isTimerCity = true;
    inputName(event: any){
        if(this.isTimerCity == true){
            this.isTimerCity = false;
            let interval = setInterval(()=>{
                this.isTimerCity = true;

                this.currentSearch = {param: 'search', value: event.target.value};
                this.offerService.getUsersList(this.currentSearch).subscribe(res => {
                    this.usersList = res
                })

                clearTimeout(interval);
            }, 2000)
        }
    }

    sendUser(user: IUser) {
        this.selectUsers.push(user);
        this.selectUsersIds.users.push(user.id);
        this.controlName.setValue(null);
        this.isValid = true;
    }
}