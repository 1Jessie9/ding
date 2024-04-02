import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [IonButton,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
    ],
})
export class HomePage {
    public email: string | undefined | null;

    constructor(
        private authService: AuthenticationService,
        private router: Router,
    ) {
        this.authService.getProfile().then((user) => {
            this.email = user?.email;
            console.log(user);
        });
    }

    signOut() {
        this.authService.signOut().then(() => {
            this.router.navigate(['/landing'])
        })
    }
}
