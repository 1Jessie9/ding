import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.page.html',
    styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
    constructor() {
        addIcons({ chevronForward })
    }

    ngOnInit() {
        console.log('here')
    }

}
