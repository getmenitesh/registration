import {Injectable, EventEmitter} from '@angular/core';
import {
    Http,
    Headers,
    RequestOptions,
    RequestOptionsArgs,
    Response,
    RequestMethod,
    Request,
    Connection,
    ConnectionBackend
} from '@angular/http';

import * as Rx from 'rxjs';

declare let configVar: any;

@Injectable()
export class BackendService {
    public configVar: any = configVar;
    public apiUrl: string = '';
    public ujaUrl: string = '';
    public tfgUrl: string = '';
    public sessionTime: number = 0;

    constructor(private http: Http) {
        this.apiUrl = this.configVar.url;
        this.tfgUrl = this.configVar.tfgUrl;
        this.ujaUrl = this.configVar.ujaUrl;
        this.sessionTime = this.configVar.sessionTime;
    }

    get(url) {
        this.updateTokenTime();
       
        let headerVar = new Headers();
        let token = this.getToken();
        if (token !== '') {
            headerVar.append('x-access-token', token);
        }
        return this.http.get(url, {
            headers: headerVar
        }).map(
            res => {
                if (res.status < 200 || res.status >= 300) {
                    throw new Error('This request has failed ' + res.status);
                } else {
                   
                    return res.json();
                }
            });
    }

    post(url, data) {
        this.updateTokenTime();
      
        let headerVar = new Headers();
        let token = this.getToken();
        if (token != null) {
            headerVar.append('x-access-token', token);
        }
        headerVar.append('Content-Type', 'application/json');
        return this.http.post(url, data, {
            headers: headerVar
        }).map(
            res => {
                if (res.status < 200 || res.status >= 300) {
                    throw new Error('This request has failed ' + res.status);
                } else {
                  
                    return res.json();
                }
            });
    }

    put(url, data) {
        this.updateTokenTime();
     
        let headerVar = new Headers();
        let token = this.getToken();
        if (token != null) {
            headerVar.append('x-access-token', token);
        }
        headerVar.append('Content-Type', 'application/json');
        return this.http.put(url, data, {
            headers: headerVar
        }).map(
            res => {
                if (res.status < 200 || res.status >= 300) {
                    throw new Error('This request has failed ' + res.status);
                } else {
                 
                    return res.json();
                }
            });
    }

    getToken() {
        let token = '';
        token = this.getCookie();
        return token;
        /*let start = 0;
        let end = token.length;
        token = token.substring(start + 5, end - 6);
        if (token === 'ef') {
            token = '';
        }*/
        
    }

    getCookie() {
        let cookieData = document.cookie;
        let tokenString = '';
        let cookieArray = cookieData.split('; ');
        let finalCookieData = [];
        for (let i = 0; i < cookieArray.length; i++) {
            let tempVar = cookieArray[i].split('=');
            finalCookieData[tempVar[0]] = tempVar[1];
        }
        return finalCookieData['token'];
       /* tokenString = decodeURIComponent(finalCookieData['token']);
        if (tokenString === undefined || tokenString == null) {
            tokenString = '';
        }
        return tokenString;*/
    }

    setCookie(cname, cvalue) {
        let d = new Date();
        d.setTime(d.getTime() + ( this.sessionTime * 60 * 1000));
        let expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + encodeURIComponent(cvalue) + ';' + expires + ';path=/';
    }

    updateTokenTime() {
        let cvalue = this.getCookie();
        if (cvalue === '') {
            return;
        }
        let d = new Date();
        d.setTime(d.getTime() + ( this.sessionTime * 60 * 1000));
        let expires = 'expires=' + d.toUTCString();
        document.cookie = 'token' + '=' + encodeURIComponent(cvalue) + ';' + expires + ';path=/';
    }
}
