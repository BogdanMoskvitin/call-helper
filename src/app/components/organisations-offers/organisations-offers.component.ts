import { Component, OnInit, Input, Inject, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IOffer } from 'src/app/models/offer.interface';
import { IOrganisation } from 'src/app/models/organisation.interface';
import { IUser } from 'src/app/models/user.interface';
import { OrganisationsOffersService } from 'src/app/services/organisations-offers.service';

@Component({
    selector: 'app-organisations-offers',
    templateUrl: './organisations-offers.component.html',
    styleUrls: ['./organisations-offers.component.scss']
})
export class OrganisationsOffersComponent implements OnInit, OnChanges {
    displayedColumns: string[] = ['organisation', 'org_accept', 'user_accept', 'created_at', 'accept', 'reject'];
    organisationsOffersList: IOffer[] = [];
    // offersSentList: IOffer[] = [];

    @Input()
    organisation: IOrganisation | null = null;

    constructor(
        public dialog: MatDialog,
        private organisationsOffersService: OrganisationsOffersService,
    ) { }

    ngOnInit(): void {
        this.getOrganisationsOffersList();
    }

    ngOnChanges(): void {
        this.getOrganisationsOffersList();
        // this.getOffersSentList();
    }

    getOrganisationsOffersList() {
        // if(this.organisation) {
            this.organisationsOffersService.getOrganisationsOffersList().subscribe(res => {
                this.organisationsOffersList = res;
            })
        // }
    }

    // getOffersSentList() {
    //     if(this.organisation) {
    //         this.organisationsOffersService.getOffersSentList(this.organisation.id).subscribe(res => {
    //             this.offersSentList = res;
    //         })
    //     }
    // }

    openAddOrganisationsOffersDialog(): void {
        const dialogRef = this.dialog.open(AddOrganisationsOffersDialogComponent);
    
        dialogRef.afterClosed().subscribe(() => {
            this.getOrganisationsOffersList();
        });
    }

    filter(status: string) {
        if(this.organisation) {
            if(status == 'all') {
                this.organisationsOffersService.getOrganisationsOffersList().subscribe(res => {
                    this.organisationsOffersList = res
                })
            } else if(status == 'unknown') {
                this.organisationsOffersService.getOrganisationsOffersList({param: 'decision', value: 'unknown'}).subscribe(res => {
                    this.organisationsOffersList = res
                })
            } else if(status == 'accept') {
                this.organisationsOffersService.getOrganisationsOffersList({param: 'decision', value: 'accept'}).subscribe(res => {
                    this.organisationsOffersList = res
                })
            } else if(status == 'reject') {
                this.organisationsOffersService.getOrganisationsOffersList({param: 'decision', value: 'reject'}).subscribe(res => {
                    this.organisationsOffersList = res
                })
            }
        }
    }

    // filterSent(status: string) {
    //     if(this.organisation) {
    //         if(status == 'all') {
    //             this.organisationsOffersService.getOffersSentList(this.organisation.id).subscribe(res => {
    //                 this.offersSentList = res
    //             })
    //         } else if(status == 'unknown') {
    //             this.organisationsOffersService.getOffersSentList(this.organisation.id, {param: 'decision', value: 'unknown'}).subscribe(res => {
    //                 this.offersSentList = res
    //             })
    //         } else if(status == 'accept') {
    //             this.organisationsOffersService.getOffersSentList(this.organisation.id, {param: 'decision', value: 'accept'}).subscribe(res => {
    //                 this.offersSentList = res
    //             })
    //         } else if(status == 'reject') {
    //             this.organisationsOffersService.getOffersSentList(this.organisation.id, {param: 'decision', value: 'reject'}).subscribe(res => {
    //                 this.offersSentList = res
    //             })
    //         }
    //     }
    // }

    acceptOffer(idOffer: number): void {
        if(this.organisation) {
            this.organisationsOffersService.acceptOffer(idOffer).subscribe(() => {
                this.getOrganisationsOffersList();
                // this.getOffersSentList();
            })
        }
    }

    rejectOffer(idOffer: number): void {
        if(this.organisation) {
            this.organisationsOffersService.rejectOffer(idOffer).subscribe(() => {
                this.getOrganisationsOffersList();
                // this.getOffersSentList();
            })
        }
    }
}

@Component({
  selector: 'add-organisations-offers-dialog',
  templateUrl: './add-organisations-offers-dialog.html',
  styleUrls: ['./organisations-offers.component.scss']
})
export class AddOrganisationsOffersDialogComponent implements OnInit {
    organisationsList: IOrganisation[] = [];
    currentSearch: {param: string, value: string} | undefined = undefined;
    selectOrganisation: IOrganisation | null = null;
    selectOrganisationId: {organisation: number} | null = null;
    isValid = false;

    constructor(
        public dialogRef: MatDialogRef<AddOrganisationsOffersDialogComponent>,
        private organisationsOffersService: OrganisationsOffersService,
        @Inject(MAT_DIALOG_DATA) public data: number,
    ) {}

    ngOnInit(): void { }

    submit(): void {
        if(this.selectOrganisationId) {
            this.organisationsOffersService.addOrganisationsOffers(this.selectOrganisationId).subscribe()
            this.dialogRef.close();
        }
    }

    controlName = new FormControl();

    isTimerCity = true;
    inputName(event: any){
        if(this.isTimerCity == true){
            this.isTimerCity = false;
            let interval = setInterval(()=>{
                this.isTimerCity = true;

                this.currentSearch = {param: 'search', value: event.target.value};
                this.organisationsOffersService.getOrganisationsList(this.currentSearch).subscribe(res => {
                    this.organisationsList = res
                })

                clearTimeout(interval);
            }, 2000)
        }
    }

    sendOrganisation(organisation: IOrganisation) {
        this.selectOrganisation = organisation;
        this.selectOrganisationId = {organisation: organisation.id};
        this.controlName.setValue(null);
        this.isValid = true;
    }
}
