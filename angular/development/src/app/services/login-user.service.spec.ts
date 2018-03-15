import { TestBed, inject } from '@angular/core/testing';
import { LoginUserService } from './login-user.service';

describe('LoginUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginUserService]
    });
  });

  it('should be created', inject([LoginUserService], (service: LoginUserService) => {
    expect(service).toBeTruthy();
  }));



    it('Set Login Status to default', inject([LoginUserService], (service: LoginUserService) => {
        service.setLoggedInStatusDefault();
        service.getLoggedInUserDetail().subscribe(nex=>{
            expect(nex['userdetail']).toBe('NOTLOGGEDIN');
        },error=>{

        })
    }));


    it('Update Login Status Flag', inject([LoginUserService], (service: LoginUserService) => {
        service.updateShowLoginPopUp('YES');
        service.showLoginPopUpObservable.subscribe(data=>{
            expect(data).toBe('YES');
        })

    }));


    it('Update Opportunity Favorite Status ', inject([LoginUserService], (service: LoginUserService) => {
        service.updateOppFavoriteStatus('2,4,5,6');
        service.showOppFavoriteStatus.subscribe(data=>{
            expect(data).toBe('2,4,5,6');
        })
    }));
});
