import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginUserService {
    private userDetail = new BehaviorSubject<object>({'userdetail': 'NOTLOGGEDIN'});
    detail = this.userDetail.asObservable();

    private showLoginPopUp = new BehaviorSubject<string>('NO');
    showLoginPopUpObservable = this.showLoginPopUp.asObservable();

    private oppFavoriteStatus = new BehaviorSubject<string>('YES');
    showOppFavoriteStatus = this.oppFavoriteStatus.asObservable();

    constructor() {
    }

    setLogedInUserDetail(userDetail: object) {
        this.userDetail.next(userDetail);
    }

    getLoggedInUserDetail() {
        return this.detail;
    }

    setLoggedInStatusDefault() {
        this.userDetail.next({'userdetail': 'NOTLOGGEDIN'});
    }

    updateShowLoginPopUp(flag: string) {
        this.showLoginPopUp.next(flag);
    }

    updateOppFavoriteStatus(value: string) {
        this.oppFavoriteStatus.next(value);
    }
}
