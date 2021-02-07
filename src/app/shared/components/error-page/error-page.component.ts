import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.less'],
})
export class ErrorPageComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    onClick(): void {
        this.router.navigate(['/welcome']);
    }
}
