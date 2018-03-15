import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl} from '@angular/forms';
import {IMyDpOptions} from 'mydatepicker';
import {BackendService} from '../services/backend.service';
import {FlashMessagesService} from 'angular2-flash-messages';

import {Observable} from 'rxjs/Rx';
import {AuthService} from 'angular2-social-login';
import {Title, Meta} from '@angular/platform-browser';

import {ErrorService} from '../services/error/error.service';
import {LoginUserService} from '../services/login-user.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {isNumeric} from '@angular/common/src/pipes/number_pipe';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['../../assets/scss/pages/registration.component.scss'],
    providers:[ErrorService]
})
export class RegistrationComponent implements OnInit {
    isSubmitted: boolean = false;
    sub: any;
    isUserLogedIn: boolean;
    registrationForm: FormGroup;
    public mask: Array<string | RegExp>;
    d: Date = new Date();
    isRegistrationAllow:boolean =true;
    isUnderAge:boolean = false;
    responseError:string = "";
    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'mm/dd/yyyy',
        disableSince: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate() + 1}
    };
    regErrorMessage: string = '';
    userId: Number = 0;
    //validators
    formValidationError = this.validation.error.required;
    passwordValidation = this.validation.error.required;
    emailValidation = this.validation.error.required;
    ujaFirstTimer: boolean;

    constructor(fb: FormBuilder,
                public be: BackendService,
                public _flashMessagesService: FlashMessagesService,
            
                public _auth: AuthService,
                private title: Title,
                private meta: Meta,
              
                public validation: ErrorService,
                public LoginUserService: LoginUserService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
        // console.log('Date :' + this.d.getFullYear() + this.d.getMonth() + 1 + this.d.getDate());
        this.sub = [];
        this.sub.name = '';
        this.registrationForm = fb.group({
            firstName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(25)])],
            lastName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(25)])],
            email: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
          
            password: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(25)])],
            cpassword: '',
          
            dob: [null, Validators.compose([Validators.required])],
          
        }, {validator: this.matchingPasswords('password', 'cpassword')})
     }

    ngOnInit() {
        this.isUserLogedIn = (sessionStorage.getItem('isLoggedIn')) ? true : false;
        if(this.isUserLogedIn == true){
            this.router.navigateByUrl('/');
        }
        // If user is logged in, return to homepage.
        let userDetail = sessionStorage.getItem('userDetail');
        if (userDetail) {
            location.href = '/';
            // console.log(sessionStorage.getItem('userDetail'));
        }
    }

   

    validateEmailConfirmation(control: FormControl): any {
        if (this.registrationForm) {
            this.emailValidation = this.validation.error.emailMatch;
            return control.value === this.registrationForm.get('email').value ? null : {notSame: true}
        }
    }

    matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey];
            let passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput != undefined && passwordConfirmationInput != undefined) {
                if (passwordInput.value !== passwordConfirmationInput.value) {
                    this.passwordValidation = this.validation.error.passwordMatch;
                    return passwordConfirmationInput.setErrors({notEquivalent: true});
                }
            }
        }
    }

   

    submitForm(value: any, isValid: boolean) {
        this.isSubmitted = true;
        this.regErrorMessage = '';
        if (isValid === true) {
            if (value.dob.formatted === undefined) {
                value.dob = this.registrationForm.controls['dob'].value.formatted;
            } else {
                value.dob = value.dob.formatted;
            }
            if (this.userId != 0) {
                value.userId = this.userId;
            }
            this.regErrorMessage = '';
            this.be.post(this.be.apiUrl + '/user', value)
                .subscribe(
                    data => {
                        if (data.status === 'error') {
                            let errorDetail = data.data;
                            if ('message' in errorDetail) {
                                this._flashMessagesService.show(errorDetail.message, {timeout: 10000});
                                this.regErrorMessage = errorDetail.message;
                            } else {
                                let errorMessages = '';
                                errorDetail.forEach(v => {
                                    errorMessages = v + ': ' + errorDetail[v];
                                });
                                this.regErrorMessage = errorMessages;
                                this._flashMessagesService.show(errorMessages, {timeout: 10000});
                            }
                          
                        } else {
                            if (data.status === 'success') {
                                this.responseError = "Registration Completed successfully";
                                this._flashMessagesService.show(data.data.message, {timeout: 10000});
                            }
                          
                        }
                    }, error => {
                        console.log(error);
                    }
                );
        }
    }
}
