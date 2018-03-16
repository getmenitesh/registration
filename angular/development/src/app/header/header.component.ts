import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl} from '@angular/forms';
import {IMyDrpOptions} from 'mydaterangepicker';
import {BsModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import {BackendService} from '../services/backend.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Observable} from 'rxjs/Rx';

import {Router} from '@angular/router';
import {LoginUserService} from '../services/login-user.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['../../assets/scss/elements/header.component.scss'],

})
export class HeaderComponent implements OnInit {
    sub: object = {};
    modal: BsModalComponent;
    isSubmitted: boolean = false;
    isForgotPassword = false;
    forgotPasswordEmail = '';
    loginForm: FormGroup;
    isUserLogedIn = false;
    loggedUserDetail = [];
    causeList = [];
    spacialList = [];
    neighborhoodList = [];
    loginErrorMsg:any = '';
    timer;
    public activeLogin: boolean = false;
    public placeholder: string = 'Anytime';
    constructor(fb: FormBuilder,
                public be: BackendService,
                public _flashMessagesService: FlashMessagesService,
         
                private router: Router,
                public LoginUserService: LoginUserService,
              ) {
            this.loginForm = fb.group({
                email: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
                password: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(25)])],
            });
    }

    ngOnInit() {
        this.isUserLoggedIn();
    }
    isUserLoggedIn() {
        let detail = sessionStorage.getItem("userDetail");
        console.log(detail)
        let userInfo = JSON.parse(detail);
        if(sessionStorage.getItem("userDetail")){
            this.isUserLogedIn = true;
        }else{
           // this.isUserLogedIn = true;
        }
        
    }
    
    
    open(md) {
        md.open();
    }
   
    submitForm(value: any, m: BsModalComponent, isValid: boolean) {
        this.isSubmitted = true;
        if (isValid === true) {
           console.log(value)
            this.be.post(this.be.apiUrl + '/auth', value)
                .subscribe(
                    data => {
                        if (data.status === 'success') {
                            sessionStorage.setItem("userDetail",JSON.stringify(data['data']))
                            this.be.setCookie('token', data.token);
                            window.location.href = '/';
                        } else {
                            this.loginErrorMsg =data.message
                        }
                    }, error => {
                        console.log(error);
                    }
                );
        } else {
            const validationResult = Validators.required(this.loginForm);
            if (validationResult) {
                this.loginForm.setErrors(validationResult);
            }
        }
    }
    logout() {
        this.be.setCookie('token', '');
        sessionStorage.removeItem("userDetail");
        window.location.href = '/';
    }
}
