import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordPageRoutingModule } from './reset-password-routing.module';

import { ResetPasswordPage } from './reset-password.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ResetPasswordPageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [ResetPasswordPage],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
})
export class ResetPasswordPageModule { }
