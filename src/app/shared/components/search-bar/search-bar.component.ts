import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.less'],
})
export class SearchBarComponent implements OnInit {
    @Input() size: NzSizeLDSType = 'large';
    @Input()
    form: FormGroup;
    @Input()
    ngxsFormPath: string;
    @Input() placeholder: string;

    constructor() {}

    ngOnInit() {}
}
