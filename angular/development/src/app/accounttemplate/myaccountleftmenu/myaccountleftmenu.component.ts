import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-myaccountleftmenu',
    templateUrl: './myaccountleftmenu.component.html',
    styleUrls: ['../../../assets/scss/pages/account.component.scss']
})
export class MyaccountleftmenuComponent implements OnInit {
    donation: number = Number(sessionStorage.getItem('donation')); // Donation status


    constructor() {
    }

    ngOnInit() {
    }
}
