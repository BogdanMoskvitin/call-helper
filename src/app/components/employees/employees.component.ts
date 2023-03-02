import { Component, OnInit, Input, Inject, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { IEmployee } from 'src/app/models/employee.interface';
import { IPosition } from 'src/app/models/position.interface';
import { IOrganisation } from 'src/app/models/organisation.interface';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnChanges {
    displayedColumns: string[] = ['name', 'position', 'email', 'phone', 'corporateAccount', 'dateJoined'];
    employeesList: IEmployee[] = [];
    filters = {
        all: true,
        corporate: false,
        ordinary: false,
    }
    currentFilter: {param: string, value: boolean} | undefined = undefined;
    currentSearch: {param: string, value: string} | undefined = undefined;

    @Input()
    organisation: IOrganisation | null = null;

    constructor(
        public dialog: MatDialog,
        private employeeService: EmployeeService,
    ) { }

    ngOnInit(): void {}

    ngOnChanges(): void {
        this.getEmployeesList();
    }

    getEmployeesList() {
        if(this.organisation) {
            this.employeeService.getEmployeesList(this.organisation.id).subscribe(res => {
                this.employeesList = res;
            })
        }
    }

    openAddEmployeeDialog(): void {
        if(this.organisation) {
            const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {data: this.organisation.id});
        
            dialogRef.afterClosed().subscribe(() => {
                this.getEmployeesList()
            });
        }
    }

    filter(status: string) {
        if(this.organisation) {
            if(status == 'all') {
                this.currentFilter = undefined;
                this.employeeService.getEmployeesList(this.organisation.id, this.currentFilter, this.currentSearch).subscribe(res => {
                    this.employeesList = res
                })
                this.filters = {
                    all: true,
                    corporate: false,
                    ordinary: false,
                }
            } else if(status == 'corporate') {
                this.currentFilter = {param: 'only_corporate', value: true}
                this.employeeService.getEmployeesList(this.organisation.id, this.currentFilter, this.currentSearch).subscribe(res => {
                    this.employeesList = res
                })
                this.filters = {
                    all: false,
                    corporate: true,
                    ordinary: false,
                }
            } else if(status == 'ordinary') {
                this.currentFilter = {param: 'only_corporate', value: false}
                this.employeeService.getEmployeesList(this.organisation.id, this.currentFilter, this.currentSearch).subscribe(res => {
                    this.employeesList = res
                })
                this.filters = {
                    all: false,
                    corporate: false,
                    ordinary: true,
                }
            }
        }
    }

    controlName = new FormControl();

    isTimerCity = true;
    inputName(event: any){
        if(this.isTimerCity == true){
            this.isTimerCity = false;
            let interval = setInterval(()=>{
                this.isTimerCity = true;

                if(this.organisation) {
                    this.currentSearch = {param: 'search', value: event.target.value};
                    this.employeeService.getEmployeesList(this.organisation.id, this.currentFilter, this.currentSearch).subscribe(res => {
                        this.employeesList = res
                    })
                }

                clearTimeout(interval);
            }, 2000)
        }
    }
}

@Component({
  selector: 'add-employee-dialog',
  templateUrl: './add-employee-dialog.html',
  styleUrls: ['./employees.component.scss']
})
export class AddEmployeeDialogComponent implements OnInit {
    employeeForm: FormGroup = new FormGroup({});
    positionsList: IPosition[] = [];
    hide: boolean = true;

    constructor(
        public dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
        private fb: FormBuilder,
        private employeeService: EmployeeService,
        @Inject(MAT_DIALOG_DATA) public data: number,
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.getPositionsList();
    }

    initForm(): void {
        this.employeeForm = this.fb.group({
            first_name: [null, Validators.required],
            last_name: [null, Validators.required],
            email: [null, Validators.required],
            position: [null, Validators.required],
            password: [null, Validators.required],
        })
    }

    submit(): void {
        this.employeeService.addEmployee(this.employeeForm.value, this.data).subscribe()
        this.dialogRef.close();
    }

    getPositionsList(): void {
        this.employeeService.getPositions().subscribe(res => {
            this.positionsList = res;
        })
    }
}