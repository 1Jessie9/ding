import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personOutline, lockClosedOutline } from 'ionicons/icons';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public loginForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private loadingController: LoadingController,
        private authService: AuthenticationService,
        private toastController: ToastController,
    ) {
        addIcons({
            personOutline,
            lockClosedOutline
        });

        this.loginForm = this.formBuilder.group({
            email: [
                '',
                [
                    Validators.required,
                    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
                ],
            ],
            password: ['', [
                Validators.required,
            ]
            ],
        });
    }

    ngOnInit() {
        console.log('here');
    }

    get errorControl() {
        return this.loginForm.controls;
    }

    async login() {
        const loading = await this.loadingController.create();
        await loading.present();
        if (this.loginForm.valid) {
            const user = await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).catch((err) => {
                this.presentToast(err)
                console.log(err);
                loading.dismiss();
            })

            if (user) {
                loading.dismiss();
                this.router.navigate(['/home'])
            }
        } else {
            return console.log('Please provide all the required values!');
        }
    }

    async presentToast(message: undefined) {
        console.log(message);

        const toast = await this.toastController.create({
            message: message,
            duration: 1500,
            position: 'top',
        });

        await toast.present();
    }
}
