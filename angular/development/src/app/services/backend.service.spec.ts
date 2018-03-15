import {TestBed, inject} from '@angular/core/testing';
import {BackendService} from './backend.service';
import {LoaderService} from './loader.service';
import {BaseRequestOptions, Http, HttpModule, Response, ResponseOptions, XHRBackend} from '@angular/http';
import 'rxjs/add/operator/map';
import {MockBackend, MockConnection} from "@angular/http/testing";
import {catchError} from "rxjs/operators";


describe('BackendService', () => {
    beforeEach(() => {
        var originalTimeout;
        TestBed.configureTestingModule({
            declarations: [],
            imports: [HttpModule],
            providers: [BackendService, LoaderService, MockBackend, BaseRequestOptions,
                {
                    provide: Http, useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions],
                }]

        });
    });

    it('should be created', inject([BackendService], (service: BackendService) => {

        expect(service).toBeTruthy();
    }));

    it('Checking for undefined Cookie', inject([BackendService], (service: BackendService) => {
        service.setCookie('token', '');
        expect(service.getToken()).toBe('');
    }));

    it('Verifying the Token from Cookie', inject([BackendService], (service: BackendService) => {
        service.setCookie('token', '-----xyz2342311++++++');
        expect(service.getToken()).toBe('xyz2342311');
    }));

    it('Setting Blank Token', inject([BackendService], (service: BackendService) => {
        service.setCookie('token', '-----ef++++++');
        expect(service.getToken()).toBe('');
    }));

    it('updating Token Time Case IF', inject([BackendService], (ser: BackendService) => {
        ser.setCookie('token', '');
        ser.updateTokenTime();
        expect(ser.getToken()).toBe('')
    }))


    it('updating Token Time Case Else', inject([BackendService], (ser: BackendService) => {
        ser.setCookie('token', '-----xyz2342311------');
        ser.updateTokenTime();
        expect(ser.getToken()).toBe('xyz2342311')
    }))


    it('Checking PUT HTTP Call', inject([BackendService, MockBackend], (ser: BackendService, mockBackend: MockBackend) => {
        let MockData = {
            "status": 200,
            "statusMessage": "success",
        };

        let response = new ResponseOptions({
            status: 200,
            body: JSON.stringify(MockData)
        });

        const baseResponse = new Response(response);

        mockBackend.connections.subscribe(
            (c: MockConnection) => c.mockRespond(baseResponse)
        );

        ser.put(ser.apiUrl + '/api/v2/user/1', {'password': 'aaaaaaaa', 'cpassword': 'aaaaaaaa'}).subscribe(data => {
            expect(data.status).toBe(200)
        }, error => {
            expect(error.status).toBe('Here');
        });
    }))


    it('Checking PUT HTTP Call For Failed Status', inject([BackendService, MockBackend], (ser: BackendService, mockBackend: MockBackend) => {
        let MockData = {
            "status": 301,
            "statusMessage": "Redirect",
        };

        let response = new ResponseOptions({
            status: 301,
            body: JSON.stringify(MockData)
        });

        const baseResponse = new Response(response);

        mockBackend.connections.subscribe(
            (c: MockConnection) => c.mockRespond(baseResponse)
        );

        ser.put(ser.apiUrl + '/api/v2/user/1', {'password': 'aaaaaaaa', 'cpassword': 'aaaaaaaa'}).subscribe(data => {
            expect(data.status).toBe(200)
        }, error => {
            expect(error).toBeTruthy();
        });
    }))

    it('Checking POST HTTP Call', inject([BackendService, MockBackend], (ser: BackendService, mb: MockBackend) => {
        let response = new Response(new ResponseOptions({
            status: 200,
            body: {
                "statusCode": 200,
                "status": "success",
                "data": {
                    "fname": "Danny", "lname": "Blue"
                }
            }
        }))

        mb.connections.subscribe(
            (c: MockConnection) => c.mockRespond(response)
        );
        // TEST Service
        ser.post('/user', {'name': 'ssdscd'}).subscribe(data => {
            expect(data.data.fname).toBe("Danny");
        });
    }));


    it('Checking POST HTTP Call Fail', inject([BackendService, MockBackend], (ser: BackendService, mb: MockBackend) => {
        let response = new Response(new ResponseOptions({
            status: 404,
            body: {
                "statusCode": 404,
                "status": "success",
                "data": {
                    "fname": "Danny", "lname": "Blue"
                }
            }
        }))

        mb.connections.subscribe(
            (c: MockConnection) => c.mockRespond(response)
        );
        // TEST Service
        ser.post('/user', {'name': 'ssdscd'}).subscribe(data => {
            expect(data.data.fname).toBe("Danny");
        }, error=>{
            expect(error).toBeTruthy();
        });
    }));

    it('Checking GET HTTP Call', inject([BackendService, MockBackend], (ser: BackendService, mb: MockBackend) => {
        let response = new Response(new ResponseOptions({
            status: 200,
            body: {
                "statusCode": 200,
                "status": "success",
                "data": {
                    "fname": "Danny", "lname": "Blue"
                }
            }
        }))

        mb.connections.subscribe(
            (c: MockConnection) => c.mockRespond(response)
        );
        // TEST Service
        ser.get('/user').subscribe(data => {
            expect(data.data.fname).toBe("Danny");
        })

    }))


    it('Checking GET HTTP Call Fail', inject([BackendService, MockBackend], (ser: BackendService, mb: MockBackend) => {
        let response = new Response(new ResponseOptions({
            status: 403,
            body: {
                "statusCode": 403,
                "status": "success",
                "data": {
                    "fname": "Danny", "lname": "Blue"
                }
            }
        }))

        mb.connections.subscribe(
            (c: MockConnection) => c.mockRespond(response)
        );
        // TEST Service
        ser.get('/user').subscribe(data => {
                expect(data.data.fname).toBe("Danny");
            }, error => {
                expect(error).toBeTruthy();
            }
        )

    }))


});
