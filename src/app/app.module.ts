import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSnackBarModule,
  NativeDateModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {HomepageComponent} from './components/homepage/homepage.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RegisterComponent} from './components/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {AuthGuard} from './guards';
import {LoginService} from './services/login.service';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {LogoComponent} from './components/logo/logo.component';
import {routing} from './app.routing';
import {RegisterService} from './services/register.service';

import {ProfileComponent} from './components/profile/profile.component';
import {CitiesService} from './services/cities.service';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {AppBarComponent} from './components/app-bar/app-bar.component';
import {KeywordsService} from './services/keywords.service';

import {DashboardComponent} from './components/dashboard-employee/dashboard.component';
import {DashboardEmployerComponent} from './components/dashboard-employer/dashboard-employer.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {JobPostingComponent} from './components/job-posting/job-posting.component';
import {UserService} from './services/user.service';
import {DatePipe} from '@angular/common';
import {SkillService} from './services/skill.service';
import {ErrorHandlerInterceptor} from './helpers/errorHandler.interceptor';
import {ErrorSnackbarComponent} from './components/error-snackbar/error-snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    RegisterComponent,
    LogoComponent,
    DashboardComponent,
    ProfileComponent,
    AppBarComponent,
    DashboardEmployerComponent,
    JobPostingComponent,
    ErrorSnackbarComponent,
  ],
  entryComponents: [
    ErrorSnackbarComponent,
  ],
  imports: [
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatIconModule,
    NativeDateModule,
    NgbCarouselModule,
    routing,
    MatExpansionModule,
  ],
  exports: [
    MatInputModule,
    FormsModule,
  ],
  providers: [
    DatePipe,
    AuthGuard,
    LoginService,
    CitiesService,
    RegisterService,
    KeywordsService,
    UserService,
    SkillService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
