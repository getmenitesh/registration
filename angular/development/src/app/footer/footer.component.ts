import {Component, OnInit} from '@angular/core';
import {BackendService} from '../services/backend.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['../../assets/scss/elements/footer.component.scss']
})
export class FooterComponent implements OnInit {
    urlUja = '';
    footerData = '';

    constructor(public be: BackendService,
                public _flashMessagesService: FlashMessagesService) {
    }

    ngOnInit() {
        this.urlUja = this.be.ujaUrl;
        let footerData = localStorage.getItem('footerData');

        if (footerData == null) {
            this.getfooterContent();
        } else {
            this.getfooterContent();
            //this.footerData = JSON.parse(footerData)
        }
    }

    getfooterContent() {
        this.be.get(this.urlUja + '/v2/navigation/footer/').subscribe(
            data => {
                if (data.status === 'successful') {
                    this.footerData = data.data;
                    localStorage.setItem('footerData', JSON.stringify(this.footerData))

                } else {
                    this._flashMessagesService.show('no footer content available', {timeout: 100000});
                }
            }, error => {
                console.log(error);
            }
        );
    }
}
