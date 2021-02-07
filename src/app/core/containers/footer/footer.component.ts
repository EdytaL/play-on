import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.less'],
})
export class FooterComponent implements OnInit {
    isWelcomePage: boolean;
    constructor(private router: Router) {}

    ngOnInit(): void {
        this.router.events.subscribe(
            (_) => (this.isWelcomePage = this.router.url.includes('welcome'))
        );
    }
}
