import {TestBed, inject} from '@angular/core/testing';
import {UserProfileService} from './user-profile.service';
import {BackendService} from './backend.service';
import {LoaderService} from "./loader.service";
import {BaseRequestOptions, Http, HttpModule, Response, ResponseOptions, XHRBackend} from '@angular/http';
import {FlashMessagesService} from "angular2-flash-messages";
import {LoginUserService} from "./login-user.service";
import {MockBackend, MockConnection} from "@angular/http/testing";


describe('UserProfileService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [UserProfileService, BackendService, LoaderService, FlashMessagesService, LoginUserService, MockBackend, BaseRequestOptions,
                {
                    provide: Http, useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions],
                }]
        });
    });

    it('should be created', inject([UserProfileService], (service: UserProfileService) => {
        expect(service).toBeTruthy();
    }));

    it('Should Get User Account Information', inject([UserProfileService, BackendService, MockBackend, LoginUserService], (service: UserProfileService, be: BackendService, mockBackEnd: MockBackend, loginUserService: LoginUserService) => {
        let MockData = {
            "statusCode": "200",
            "status": "success",
            "data": {
                "email": "getme.nitesh#gmail.com",
                "firstName": "Nitesh",
                "lastName": "Kumar",
				"userId": 49974,
            }
        }

        let response = new ResponseOptions({
            status: 200,
            body: JSON.stringify(MockData)
        });

        const baseResponse = new Response(response);

        mockBackEnd.connections.subscribe(
            (c: MockConnection) => c.mockRespond(baseResponse)
        );
        //console.log("userDetail");
        service.getAccountInfo();
        loginUserService.getLoggedInUserDetail().subscribe(success => {
            expect(success['login_state']).toBe(1);
        })
    }));

    it('Should Get User Account Information With login Status 3', inject([UserProfileService, BackendService, MockBackend, LoginUserService], (service: UserProfileService, be: BackendService, mockBackEnd: MockBackend, loginUserService: LoginUserService) => {
        let MockData = {
            "statusCode": "200",
            "status": "success",
            "data": {
                "email": "getme.nitesh#gmail.com",
                "firstName": "Nitesh",
                "lastName": "Kumar",
				"userId": 49974,
            }
        }

        let response = new ResponseOptions({
            status: 200,
            body: JSON.stringify(MockData)
        });

        const baseResponse = new Response(response);

        mockBackEnd.connections.subscribe(
            (c: MockConnection) => c.mockRespond(baseResponse)
        );
        service.getAccountInfo();

        loginUserService.getLoggedInUserDetail().subscribe(success => {
            expect(success['login_state']).toBe(3);
        })

    }));

    it('Should Get User Account Information With Failed Status', inject([UserProfileService, BackendService, MockBackend, LoginUserService], (service: UserProfileService, be: BackendService, mockBackEnd: MockBackend, loginUserService: LoginUserService) => {
        let MockData = {
            "statusCode": "404",
            "status": "Page Not Found",
            "data": {}
        }

        let response = new ResponseOptions({
            status: 404,
            body: JSON.stringify(MockData)
        });

        const baseResponse = new Response(response);

        mockBackEnd.connections.subscribe(
            (c: MockConnection) => c.mockRespond(baseResponse)
        );

        service.getAccountInfo();
        loginUserService.getLoggedInUserDetail().subscribe(success => {
            expect(success['userdetail']).toBe('NOTLOGGEDIN');
        })
    }));


    it("Checks getUserAccountDetails", inject([UserProfileService, BackendService, MockBackend, LoginUserService],
        (service: UserProfileService, be: BackendService, mockBackEnd: MockBackend, loginUserService: LoginUserService) => {
            let MockData = {
            "statusCode": "200",
            "status": "success",
            "data": {
                "email": "getme.nitesh#gmail.com",
                "firstName": "Nitesh",
                "lastName": "Kumar",
				"userId": 49974,
            }
        }


            let response = new ResponseOptions({
                status: 200,
                body: JSON.stringify(MockData)
            });

            const baseResponse = new Response(response);

            mockBackEnd.connections.subscribe(
                (c: MockConnection) => c.mockRespond(baseResponse)
            );

            service.getUserAccountDetails("1514878610").subscribe(success => {
                expect(success.data.userDetail.email).toBe("vijayarya326+01@gmail.com")
            });

        }));


    it("Update setUserAccountDetails when Declineing ", inject([UserProfileService, BackendService, MockBackend, LoginUserService],
        (service: UserProfileService, be: BackendService, mockBackEnd: MockBackend, loginUserService: LoginUserService) => {

            let MockData = {
                "statusCode": 200, "status": "Success"
            };


            let response = new ResponseOptions({
                status: 200,
                body: JSON.stringify(MockData)
            });

            const baseResponse = new Response(response);

            mockBackEnd.connections.subscribe(
                (c: MockConnection) => c.mockRespond(baseResponse)
            );
            const  userObject = {
                "firstName": "nitesh",
                "lastName": "Kumar",
                "email": "nitesh.kumar",

                "dob": "08/03/1991",

            };

            service.setUserAccountDetails("zaAXSACDSCD",userObject  ).subscribe(success => {
                        expect(userObject.tandc).toBe("false");
                        expect(success.statusCode).toBe(200);
                },
                error => {
                    console.log(error);
                })

        }));

    


})
;
