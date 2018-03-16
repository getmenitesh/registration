import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl} from '@angular/forms';
import {IMyDpOptions} from 'mydatepicker';
import {BackendService} from '../services/backend.service';
import {FlashMessagesService} from 'angular2-flash-messages';

import {LoginUserService} from '../services/login-user.service';
import {UserProfileService} from '../services/user-profile.service';



@Component({
    selector: 'app-update-profile',
    templateUrl: './update-profile.component.html',
    styleUrls: ['../../assets/scss/pages/account.component.scss'],
  
})
export class UpdateProfileComponent implements OnInit {
    isSubmitted: boolean = false;
    isSubmittedPassword: boolean = false;
    dob: string = '';
    registrationForm: FormGroup;
    resetPasswordForm: FormGroup;
    d: Date = new Date();
    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'mm/dd/yyyy',
        disableSince: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate() + 1}
    };
    isRegistrationAllow: boolean = true;

    formActive: boolean = false;
    updateSuccessMessage: string = '';
    userId:any;
    constructor(fb: FormBuilder,
                public be: BackendService,
                public _flashMessagesService: FlashMessagesService,
         
                public LoginUserService: LoginUserService,
                public userProfileService: UserProfileService,
               
                public uPro: UserProfileService,) {
        this.registrationForm = fb.group({
            firstName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(25)])],
            lastName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(25)])],
          
            dob: [null, Validators.compose([Validators.required])],
            email: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(25)])],
           

        });
        
    }

    ngOnInit() {
       
        this.updateSuccessMessage = '';
        this.getProfileDetail();
       

       
    }

   

    getProfileDetail() {
        let detail = sessionStorage.getItem("userDetail");
      
        let userInfo = JSON.parse(detail);
        this.userId = userInfo['_id'];
        //this.userId=this.be.getCookie();
        this.be.get(this.be.apiUrl + '/user/'+this.userId)
        .subscribe(
            data => {console.log(data)
                if (data.status === 'error') {
                    
                  
                } else {
                    if (data.status === 'success') {
                        this.registrationForm.controls['firstName'].setValue(data.data.firstName);
                        this.registrationForm.controls['lastName'].setValue(data.data.lastName);
                       
                        this.registrationForm.controls['email'].setValue(data.data.email);
                        this.registrationForm.controls['dob'].setValue(data.data.dob);
                        
                    }
                  
                }
            }, error => {
                console.log(error);
            }
        );
    }

    submitForm(value: any, isValid: boolean) {
        this.isSubmitted = true;
        
        if (isValid === true) {
            if (value.dob.formatted === undefined) {
                value.dob = this.dob;
            } else {
                value.dob = value.dob.formatted;
            }

            this.formActive = true;
            let detail = sessionStorage.getItem("userDetail");
      
            let userInfo = JSON.parse(detail);
            let userId = userInfo['_id'];
           // let userId=this.be.getCookie();
            this.be.put(this.be.apiUrl + '/user/'+userId, value)
                .subscribe(
                    data => {console.log(data)
                        if (data.status === 'error') {
                            let errorDetail = data.data;
                            if ('message' in errorDetail) {
                                this._flashMessagesService.show(errorDetail.message, {timeout: 10000});
                            } else {
                                let errorMessages = '';
                                errorDetail.forEach(v => {
                                    errorMessages = v + ': ' + errorDetail[v];
                                });
                                this._flashMessagesService.show(errorMessages, {timeout: 10000});
                            }
                        } else {
                                              
                            this.updateSuccessMessage = data.message;
                        }
                        this.formActive = false;
                    }, error => {
                        console.log(error);
                        this.formActive = false;
                    }
                );
        }
    }

    

    
}
