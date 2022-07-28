import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { VeterinaireComponent } from './components/veterinaire/veterinaire.component';
import { AuthComponent } from './components/auth/auth.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './services/auth.guard';
import { PostsComponent } from './components/post/posts.component';
import { TakeAppointmentComponent } from './components/take-appointment/take-appointment.component';
import { NewPostComponent } from './components/post/new-post/new-post.component';
import { ShowAllCommentsComponent } from './components/post/show-all-comments/show-all-comments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { VeterinaireprofileComponent } from './veterinaireprofile/veterinaireprofile.component';
import { SignupveterinaireComponent } from './components/signupveterinaire/signupveterinaire.component';
import { MyappointmentsComponent } from './components/myappointments/myappointments.component';
import { UpgradeRequestComponent } from './components/upgrade-request/upgrade-request.component';

const routes: Routes = [
    {path:'veterinaire', component:VeterinaireComponent},
    {path:'login', component:AuthComponent},
    {path:'signup', component:SignupveterinaireComponent},
    {path:'appointments/:id', component:AppointmentComponent},
    {path:'', component:PostsComponent},
    {path:'takeAppointment', component:TakeAppointmentComponent},
    {path:'takeAppointment/:id', component:TakeAppointmentComponent, canActivate:[AuthGuard]},
    {path:'profile', component:ProfileComponent},
    {path:'profile/edit' , component:EditProfileComponent},
    {path:'profile/:id', component:ProfileComponent},
    {path:'veterinaire/:id', component:VeterinaireprofileComponent},
    {path:'signup/veterinaire', component:SignupveterinaireComponent},
    {path:'myappointments/:id', component:MyappointmentsComponent},
    {path:'upgrade/:id', component:UpgradeRequestComponent},
    
  {
      path: '', component: PostsComponent, children :[
      {path:'newPost' , component:NewPostComponent},
      {path: ':id', component: ShowAllCommentsComponent },
      {path:'deletePosts' , component:PostsComponent},
      {path:'addLike/:id' , component:PostsComponent},
      {path:'deleteLike/:id' , component:PostsComponent},
      {path:'deleteComment/:id' , component:ShowAllCommentsComponent},]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
