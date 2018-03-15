// Angular Core
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';


//  Core
import {routes} from './app.routes';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MyaccountleftmenuComponent} from './accounttemplate/myaccountleftmenu/myaccountleftmenu.component';
import {PublicComponent} from './public/public.component';
import {AccountComponent} from './account/account.component';
import {UpdateProfileComponent} from './update-profile/update-profile.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RegistrationComponent} from './registration/registration.component';


// Imported
import {MyDatePickerModule} from 'mydatepicker';
import {Angular2SocialLoginModule} from 'angular2-social-login';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {BsModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';


// Services

import {BackendService} from './services/backend.service';


import {LoginUserService} from './services/login-user.service';

import {GardService} from './services/gard.service';
import {UserProfileService} from './services/user-profile.service';





@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MyaccountleftmenuComponent,
        PublicComponent,
        AccountComponent,
        UpdateProfileComponent,
        PageNotFoundComponent,
        RegistrationComponent,
       
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        FormsModule,
        MyDatePickerModule,
        ReactiveFormsModule,
        FlashMessagesModule,
        RouterModule.forRoot(routes),
        BsModalModule,
        MatTabsModule,
        Angular2SocialLoginModule,
        HttpClientModule,
       

    ],
    providers: [
        BackendService,
        LoginUserService,
        GardService,
        UserProfileService,
     ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class AppModule {
    constructor() {
    }
}


