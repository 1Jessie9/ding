import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.page.html',
    styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
    public email!: string;

    constructor(
        private authService: AuthenticationService,
        private toastController: ToastController,
        private router: Router,
    ) { }

    ngOnInit() {
        console.log('here');
    }

    reset() {
        this.authService.resetPassword(this.email).then(() => {
            console.log('sent'); //show confirmation dialog
            this.presentToast()
        })
    }
    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Your reset password link has been sent on your email',
            duration: 2000,
            position: 'bottom'
        });

        toast.present();
        toast.onDidDismiss().then(() => {
            this.router.navigate(['/login']);
        })
    }
}
