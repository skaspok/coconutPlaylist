import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { JsonpModule } from '@angular/http';

import {
    CoconutPlaylistSharedLibsModule,
    CoconutPlaylistSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    Principal,
    HasAnyAuthorityDirective,
    JhiLoginModalComponent
} from './';

@NgModule({
    imports: [
        CoconutPlaylistSharedLibsModule,
        CoconutPlaylistSharedCommonModule,
        JsonpModule,
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        UserService,
        DatePipe
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        CoconutPlaylistSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class CoconutPlaylistSharedModule { }
