import {Component, OnInit} from '@angular/core';
import {OktaAuthService} from "@okta/okta-angular";
import {NavigationStart, Router} from "@angular/router";
//@ts-ignore
import * as OktaSignIn from '@okta/okta-signin-widget';
import {Tokens} from '@okta/okta-auth-js';
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    authService;
    widget = new OktaSignIn({
        el: '#okta-signin-container',
        baseUrl: environment.oidc.issuer.split('/oauth2/')[0],
        authParams: {
            pkce: true,
            issuer: environment.oidc.issuer,
            responseType: ['id_token', 'token'],
            scopes: environment.oidc.scopes,
        },
        clientId: environment.oidc.clientId,
        redirectUri: environment.oidc.redirectUri,
        language: "ru",
        features: {
            rememberMe: false,
        },
        colors: {
            brand: '#673ab7'
        }
    });

    constructor(oktaAuth: OktaAuthService, router: Router) {
        this.authService = oktaAuth;

        // Show the widget when prompted, otherwise remove it from the DOM.
        router.events.forEach(event => {
            if (event instanceof NavigationStart) {
                switch (event.url) {
                    case '/login':
                        break;
                    case '/protected':
                        break;
                    default:
                        this.widget.remove();
                        break;
                }
            }
        });
    }

    async ngOnInit() {
        const originalUri = this.authService.getOriginalUri();
        if (!originalUri) {
            this.authService.setOriginalUri('/');
        }

        const tokens: Tokens = await this.widget.showSignInToGetTokens({
            el: '#okta-signin-container',
        });
        this.authService.handleLoginRedirect(tokens);
        this.widget.hide();
    }

}
