import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MainComponent } from './components/main/main.component';
import { TokenInterceptor } from './classes/token.interceptor';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProfileComponent } from './components/profile/profile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { OrganisationsComponent, AddOrganisationDialogComponent } from './components/organisations/organisations.component';
import { EditOrganisationDialogComponent, OrganisationComponent } from './components/organisation/organisation.component';
import { MatCardModule } from '@angular/material/card';
import { AddGroupDialogComponent, GroupsComponent } from './components/groups/groups.component';
import { MatSelectModule } from '@angular/material/select';
import { AddEmployeeDialogComponent, EmployeesComponent } from './components/employees/employees.component';
import { AddOfferDialogComponent, OffersComponent } from './components/offers/offers.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ChartComponent } from './components/chart/chart.component';
import { GroupComponent } from './components/group/group.component';
import { MembersComponent } from './components/members/members.component';
import { AddBreakDialogComponent, BreaksComponent } from './components/breaks/breaks.component';
import { BreakComponent } from './components/break/break.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { DatePipe } from '@angular/common';
import { MyGroupsComponent } from './components/my-groups/my-groups.component';
import { MyBreaksComponent } from './components/my-breaks/my-breaks.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        MainComponent,
        ProfileComponent,
        AddOrganisationDialogComponent,
        OrganisationsComponent,
        OrganisationComponent,
        EditOrganisationDialogComponent,
        GroupsComponent,
        AddGroupDialogComponent,
        EmployeesComponent,
        AddEmployeeDialogComponent,
        OffersComponent,
        AddOfferDialogComponent,
        ChartComponent,
        GroupComponent,
        MembersComponent,
        BreaksComponent,
        BreakComponent,
        AddBreakDialogComponent,
        MyGroupsComponent,
        MyBreaksComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        HttpClientModule,
        MatToolbarModule,
        MatSidenavModule,
        MatTabsModule,
        MatDialogModule,
        MatTableModule,
        MatCardModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatButtonToggleModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSlideToggleModule,
        NgxMatTimepickerModule,
    ],
    providers: [ 
        { provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor }, 
        { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
        DatePipe,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}