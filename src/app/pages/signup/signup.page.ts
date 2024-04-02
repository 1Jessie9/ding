import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonIcon, IonItem, IonFab, IonText, IonButton, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, lockClosedOutline } from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
    standalone: true,
    imports: [IonFabButton, IonButton, 
        IonText, 
        IonFab, 
        IonItem,
        IonIcon,
        IonInput,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        CommonModule,
        FormsModule,
        RouterLink,
        ReactiveFormsModule,
        IonText,
    ]
})
export class SignupPage implements OnInit {
    public signForm!: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
        public authService: AuthenticationService,
        public router: Router,
        private loadingController: LoadingController,
        private toastController: ToastController,
    ) {
        addIcons({
            personOutline,
            lockClosedOutline
        });

        this.signForm = this.formBuilder.group({
            fullname: ['',
                [Validators.required]
            ],
            contact: ['',
                [
                    Validators.required,
                    Validators.pattern("^[0-9]*$"),
                    Validators.minLength(10),
                ]
            ],
            email: [
                '',
                [
                    Validators.required,
                    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
                ],
            ],
            password: ['', [
                Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
                Validators.required,
            ],
            ],
        });
    }

    ngOnInit() {
        console.log('here');
    }

    get errorControl() {
        return this.signForm.controls;
    }

    async signUpWithGoogle() {
        const user = await this.authService.GoogleAuth().then(() => {
            this.router.navigate(['/home'])
        })
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

    async signUP() {
        const loading = await this.loadingController.create();
        await loading.present();
        if (this.signForm.valid) {

            const user = await this.authService.registerUser(this.signForm.value.email, this.signForm.value.password, this.signForm.value.fullname).catch((err) => {
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
}
