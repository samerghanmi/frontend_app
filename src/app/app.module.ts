import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VeterinaireService } from './services/veterinaire.service';
import { VeterinaireComponent } from './components/veterinaire/veterinaire.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostsComponent } from './components/post/posts.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AuthComponent } from './components/auth/auth.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { SignupComponent } from './components/signup/signup.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TakeAppointmentComponent } from './components/take-appointment/take-appointment.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewPostComponent } from './components/post/new-post/new-post.component';
import { ShowAllCommentsComponent } from './components/post/show-all-comments/show-all-comments.component';
import { ShowCommentsDirective } from './directives/show-comments.directive';
import { AuthInterceptor } from './auth-interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CheckImagePipe } from './pipes/check-image.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { MatCardModule } from '@angular/material/card';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FilterPipe } from './filter.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VeterinaireprofileComponent } from './veterinaireprofile/veterinaireprofile.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SignupveterinaireComponent } from './components/signupveterinaire/signupveterinaire.component';
import { MyappointmentsComponent } from './components/myappointments/myappointments.component';
import { UpgradeRequestComponent } from './components/upgrade-request/upgrade-request.component';
import { ReportComponent } from './components/report/report.component';
import { SearchPipe } from './search.pipe';
import { CategoriePipe } from './categorie.pipe';

@NgModule({
  declarations: [
    AppComponent,
    VeterinaireComponent,
    NavbarComponent,
    HeaderComponent,
    PostsComponent,
    FooterComponent,
    AppointmentComponent,
    AuthComponent,
    SignupComponent,
    TakeAppointmentComponent,
    NewPostComponent,
    ShowAllCommentsComponent,
    ShowCommentsDirective,
    CheckImagePipe,
    ProfileComponent,
    EditProfileComponent,
    FilterPipe,
    VeterinaireprofileComponent,
    SignupveterinaireComponent,
    MyappointmentsComponent,
    UpgradeRequestComponent,
    ReportComponent,
    SearchPipe,
    CategoriePipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    CoolSocialLoginButtonsModule,
    SocialLoginModule,
    ScrollingModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    MatProgressSpinnerModule

  ],
  providers: [
    VeterinaireService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    //google Auth Provider

    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '21427827582-idlf42p67i647c1h68d6cen3t21if87s.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
