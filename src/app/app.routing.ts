import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AppBarComponent} from './components/app-bar/app-bar.component';
import {DashboardComponent} from './components/dashboard-employee/dashboard.component';
import {DashboardEmployerComponent} from './components/dashboard-employer/dashboard-employer.component';
import { JobPostingComponent } from './components/job-posting/job-posting.component';


const appRoutes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'dashboard-employer', component: DashboardEmployerComponent},
  {path: 'job/:id', component: JobPostingComponent},
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
