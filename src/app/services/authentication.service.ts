import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private angularFireAuth: AngularFireAuth
    ) { }

    async registerUser(email: string, password: string, name: string) {
        return await this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    }

    async loginUser(email: string, password: string) {
        return await this.angularFireAuth.signInWithEmailAndPassword(email, password);
    }

    async resetPassword(email: string) {
        return await this.angularFireAuth.sendPasswordResetEmail(email);
    }

    async getProfile() {
        return await this.angularFireAuth.currentUser
    }

    async signOut() {
        return await this.angularFireAuth.signOut();
    }
    async AuthLogin(provider: any) {

        try {
            const result = await this.angularFireAuth.signInWithPopup(provider);
        } catch (error) {
            window.alert(error);
        }
    }

    async GoogleAuth() {
        const auth = getAuth();
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                console.log(result);

                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                // var token = credential?.accessToken;
                // The signed-in user info.
                var user = result.user;
                // IdP data available in result.additionalUserInfo.profile.
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }
}
