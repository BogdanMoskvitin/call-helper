import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreakComponent } from './components/break/break.component';
import { GroupComponent } from './components/group/group.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { MyBreaksComponent } from './components/my-breaks/my-breaks.component';
import { MyGroupsComponent } from './components/my-groups/my-groups.component';
import { OrganisationComponent } from './components/organisation/organisation.component';
import { OrganisationsComponent } from './components/organisations/organisations.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
	{ path: '', redirectTo: 'my-breaks', pathMatch: 'full' },
	{ path: 'main', component: MainComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'organisations', component: OrganisationsComponent },
	{ path: 'organisation/:id', component: OrganisationComponent },
	{ path: 'group/:id', component: GroupComponent },
	{ path: 'break/:id', component: BreakComponent },
	{ path: 'my-groups', component: MyGroupsComponent },
	{ path: 'my-breaks', component: MyBreaksComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }