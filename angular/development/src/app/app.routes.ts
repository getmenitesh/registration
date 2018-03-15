import {Routes} from '@angular/router';
import {PublicComponent} from './public/public.component';
import {AccountComponent} from './account/account.component';
import {UpdateProfileComponent} from './update-profile/update-profile.component';
import {GardService} from './services/gard.service';
import {RegistrationComponent} from './registration/registration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [

    {
        path: '', component: PublicComponent, children: [
        {path: 'join', component: RegistrationComponent},
    ]
    },
    {
        path: 'user-account', component: AccountComponent,  children: [
            {path: '', redirectTo: 'preferences', pathMatch: 'full'},
            {path: 'preferences', component: UpdateProfileComponent},
     
    ]
    },
    {path: '**', redirectTo: ''}
];


