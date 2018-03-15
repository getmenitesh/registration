import {TestBed, inject} from '@angular/core/testing';
import {BackendService} from "./backend.service";
import {RouterTestingModule} from '@angular/router/testing';
import {
    BaseRequestOptions, ConnectionBackend, Http, HttpModule, Response,
    XHRBackend
} from '@angular/http';

import {GardService} from './gard.service';
import {MockBackend} from "@angular/http/testing";
import {LoaderService} from "./loader.service";

describe('GardService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [Http, GardService, BackendService, ConnectionBackend, MockBackend, BaseRequestOptions, LoaderService,
                {
                    provide: Http, useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                }]
        });
    });

    it('should be created', inject([GardService], (service: GardService) => {
        expect(service).toBeTruthy();
    }));

    it("Check Can Activate Positive", inject([GardService], (service: GardService) => {
        let status = service.canActivate();
        expect(status).toBeTruthy();
    }));

    it("Check Login Positive", inject([GardService],(service:GardService)=>{
        let status = service.checkLoggedIn();
        expect(status).toBeTruthy();
    }));

    it("Check Can Activate Negative", inject([GardService, BackendService], (service: GardService, backEndService: BackendService) => {
        backEndService.setCookie('token', '');
        let status = service.canActivate();
        expect(status).toBe(undefined);
    }));

    it("Check Login Negative", inject([GardService, BackendService], (service: GardService, backEndService: BackendService) => {
        backEndService.setCookie('token', '');
        let status = service.checkLoggedIn();
        expect(status).toBeFalsy();
    }));


    /*checkLoggedIn*/
});
