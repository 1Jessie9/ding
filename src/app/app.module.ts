import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonButton, IonFab, IonFabButton, IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { HomePage } from './home/home.page';
import { LoginPage } from './pages/login/login.page';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        provideFirebaseApp(() => initializeApp({
            "projectId": "ding-ding19",
            "appId": "1:153906681384:web:8855c121287c955d66471d",
            "storageBucket": "ding-ding19.appspot.com",
            "apiKey": "AIzaSyCoGOrz2DyOvmxJ0xJX9uh-5M3BcHsLVE8",
            "authDomain": "ding-ding19.firebaseapp.com",
            "messagingSenderId": "153906681384",
            "measurementId": "G-CS1NJYV5ZN"
        })),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        AngularFireModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
        IonButton, 
        IonFabButton, 
        IonFab,
    ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
})
export class AppModule { }
