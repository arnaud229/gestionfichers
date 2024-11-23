// app.module.ts
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app/app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environement } from '../environements/environements';
import { SingnInComponent } from '../app/singn-in/singn-in.component';
import { SingnUpComponent } from '../app/singn-up/singn-up.component';
import { HomeComponent } from '../app/home/home.component';
import { DashboardComponent } from '../app/dashboard/dashboard.component';


bootstrapApplication(AppComponent); 1 

@NgModule({
  declarations: [
    SingnInComponent,
    SingnUpComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,   
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environement.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule,
    // MatProgressBarModule,
  
  ],
  providers: [],

})
export class ModulesModule 
 { }