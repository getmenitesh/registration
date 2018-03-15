import { Injectable } from '@angular/core';
import {BackendService} from './backend.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {LoginUserService } from './login-user.service'
import {Router} from '@angular/router';
@Injectable()
export class UserProfileService {
  userDetail:any = {};
  constructor(private be: BackendService, public _flashMessagesService: FlashMessagesService, private loginUserService: LoginUserService, private router: Router) { }
  getAccountInfo(){
    this.be.get(this.be.apiUrl + '/api/v2/user/').subscribe(
      data => {
          if (data.status === 'error') {
              //this._flashMessagesService.show(data.data.message, {timeout: 100000});
          } else {
              //sessionStorage.setItem("userData",  JSON.stringify(data.data));
            if(data.data.login_state == 3){
                this.router.navigateByUrl('/join');
            }else{
                this.loginUserService.setLogedInUserDetail(data.data);
            }

              //this.userDetail = data.data;
          }
      }, error => {
          console.log(error);
      }
    );
    return  this.userDetail;
  }

}

