import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreakComponent } from './components/break/break.component';
import { GroupComponent } from './components/group/group.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { OrganisationComponent } from './components/organisation/organisation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
	{ path: '', redirectTo: 'main', pathMatch: 'full' },
	{ path: 'main', component: MainComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'organisation/:id', component: OrganisationComponent },
	{ path: 'group/:id', component: GroupComponent },
	{ path: 'break/:id', component: BreakComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }