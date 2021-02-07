import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.less'],
})
export class NavbarComponent implements OnInit {
    isWelcomePage: boolean;
    constructor(private router: Router) {}

    ngOnInit(): void {
        this.isWelcomePage = this.router.url.includes('welcome');
        this.router.events.subscribe(
            (_) => (this.isWelcomePage = this.router.url.includes('welcome'))
        );
    }

    onNavigate(): void {
        window.open('https://github.com/EdytaL/play-on', '_blank');
    }
}
