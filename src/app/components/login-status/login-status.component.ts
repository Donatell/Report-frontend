import {Component, OnInit} from '@angular/core';
import {OktaAuthService} from "@okta/okta-angular";

@Component({
    selector: 'app-login-status',
    templateUrl: './login-status.component.html',
    styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

    userName: string | undefined;

    constructor(public oktaAuth: OktaAuthService) {
    }

    async ngOnInit() {
        // returns an object with user's claims
        const userClaims = await this.oktaAuth.getUser();

        // user name is exposed directly as property
        this.userName = userClaims.name;
    }

    logout() {
        this.oktaAuth.signOut({
            originalUri: '/login'
        });
    }

}
