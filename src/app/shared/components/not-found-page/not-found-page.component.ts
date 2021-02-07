import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-not-found-page',
    templateUrl: './not-found-page.component.html',
    styleUrls: ['./not-found-page.component.less'],
})
export class NotFoundPageComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    onClick(): void {
        this.router.navigate(['/welcome']);
    }
}
