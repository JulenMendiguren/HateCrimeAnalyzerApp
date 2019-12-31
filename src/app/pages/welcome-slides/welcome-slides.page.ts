import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-welcome-slides',
    templateUrl: './welcome-slides.page.html',
    styleUrls: ['./welcome-slides.page.scss']
})
export class WelcomeSlidesPage implements OnInit {
    slideOpts = {
        initialSlide: 0,
        speed: 400
    };
    constructor(private router: Router) {}

    ngOnInit() {}

    onRegisterClick() {
        this.router.navigateByUrl('user/user-quest/update');
    }
}
