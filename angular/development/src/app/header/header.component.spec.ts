import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {BaseRequestOptions, Http, HttpModule, Response, ResponseOptions} from "@angular/http";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {SafeUriPipe} from "../pipes/safeUri";
import {EllipsisPipe} from "../pipes/ellipsis.pipe";
import {SearchFilterPipe} from "../pipes/search.pipe";
import {SafeHtmlPipe} from "../pipes/sanatize.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BackendService} from "../services/backend.service";
import {LoaderService} from "../services/loader.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {SerializeService} from "../services/serialize.service";
import {RouterTestingModule} from "@angular/router/testing";
import {LoginUserService} from "../services/login-user.service";
import {AuthService} from "angular2-social-login";
import {ErrorService} from "../services/error/error.service";
import {CompleteRegistrationService} from "../services/complete-registration.service";
import {BsModalComponent, BsModalService} from 'ng2-bs3-modal/ng2-bs3-modal';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent, SafeHtmlPipe, SafeUriPipe, EllipsisPipe, SearchFilterPipe],
            providers: [BackendService, BsModalService, LoaderService, FlashMessagesService, SerializeService, MockBackend, BaseRequestOptions, LoginUserService, AuthService, ErrorService, CompleteRegistrationService,
                {
                    provide: Http, useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions],
                }

            ],
            imports: [ReactiveFormsModule, FormsModule, HttpModule, RouterTestingModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));


    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    
    it('verify Login Form to be Falsy', inject([], () => {
        expect(component.loginForm.valid).toBeFalsy();
    }));

    it('verify Login Form to be Truthy', inject([], () => {
        component.loginForm.controls['email'].setValue('getme.nitesh#gmail.com');
        component.loginForm.controls['password'].setValue('aaaaaaaa');
        expect(component.loginForm.valid).toBeTruthy();
        expect(component.loginForm.controls['email'].value).toBe('getme.nitesh#gmail.com');
        expect(component.loginForm.controls['password'].value).toBe('aaaaaaaa');
    }));

    it('Verify Login In', inject([ MockBackend, BackendService, LoginUserService],( mockBackend: MockBackend, be:BackendService, lus: LoginUserService)=>{
        const MockData = {
            "statusCode": "200",
            "status": "success",
            "data": {
                "_id": 49974,
                
                "email": "getme.nitesh#gmail.com",
                "first_name": "Nitesh",
                "last_name": "Kumar",
                
            }
        };

        let response = new ResponseOptions({
            status: 200,
            body: JSON.stringify(MockData),
        });

        const baseResponse = new Response(response);

        mockBackend.connections.subscribe(
            (c: MockConnection) => c.mockRespond(baseResponse)
        );
         component.loginForm.controls['email'].setValue('getme.nitesh#gmail.com');
            component.loginForm.controls['password'].setValue('aaaaaaaa');
            expect(component.loginForm.valid).toBeTruthy();


        const modal: BsModalComponent = fixture.componentInstance.modal;
        //let spy = spyOn(window.location, 'reload').and.returnValue(true);
        component.submitForm(component.loginForm, modal, component.loginForm.valid);
        expect(be.getToken()).toBe("YToyOntzOjI6ImlkIjtpOjQ5OTc0O3M6NToiZW1haWwiO3M6MjI6InZpamF5Lmt1bWFyQGljcmVvbi5jb20iO30tNWE2NWVkYTZlYzRlNQ==");
    }));
