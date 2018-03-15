import { Injectable } from '@angular/core';
import { CanActivate,Router} from '@angular/router';
import { BackendService } from "./backend.service"
@Injectable()
export class GardService  implements CanActivate{

  constructor(private router: Router, private backEndService: BackendService) {
  }

  canActivate(){
    let token = this.backEndService.getToken();
    if(token){
       return true;
    }else{
      this.router.navigate([''])
    }
  }

  checkLoggedIn(){
      let token = this.backEndService.getToken();
      if(token){
          return true;
      }else{
        return false;
      }

  }
}
