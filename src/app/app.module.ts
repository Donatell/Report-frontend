import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FileUploadComponent} from './components/reports-module/file-upload/file-upload.component';
import {PatientListsTableComponent} from './components/reports-module/patient-lists-table/patient-lists-table.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {PatientListsService} from "./services/reports-module/patient-lists.service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from "@angular/material/input";
import {Router, RouterModule, Routes} from "@angular/router";
import {MatStepperModule} from "@angular/material/stepper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {NgxMatFileInputModule} from "@angular-material-components/file-input";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {PriceComponent} from './components/reports-module/price/price.component';
import {GenderComponent} from './components/reports-module/gender/gender.component';
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SpinnerOverlayComponent} from './components/common/spinner-overlay/spinner-overlay.component';
import {ReportsComponent} from './components/reports-module/reports/reports.component';
import {OKTA_CONFIG, OktaAuthGuard, OktaAuthModule, OktaAuthService, OktaCallbackComponent} from "@okta/okta-angular";
import {environment} from "../environments/environment";
import {LoginStatusComponent} from './components/common/login-status/login-status.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {LoginComponent} from './components/common/login/login.component';
import {DeletePatientListDialogComponent} from './components/reports-module/patient-lists-table/delete-patient-list-dialog/delete-patient-list-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {DepartmentComponent} from './components/reports-module/department/department.component';

const CALLBACK_PATH = 'login/callback'

const oktaConfig = {
    clientId: environment.oidc.clientId,
    issuer: environment.oidc.issuer,
    redirectUri: environment.oidc.redirectUri,
    scopes: environment.oidc.scopes,
    pkce: true
}

export function onAuthRequired(oktaAuth: OktaAuthService, injector: Injector) {
    const router = injector.get(Router);

    // Redirect the user to your custom login page
    router.navigate(['/login']);
}

const routes: Routes = [
    {path: CALLBACK_PATH, component: OktaCallbackComponent},
    {path: 'login', component: LoginComponent},
    {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [OktaAuthGuard],
        canActivateChild: [OktaAuthGuard],
        data: {onAuthRequired},
        children: [
            {path: 'specify-gender/:patientListId', component: GenderComponent},
            {path: 'specify-prices/:patientListId', component: PriceComponent},
            {path: 'specify-department/:patientListId', component: DepartmentComponent},
            {path: 'patient-lists', component: PatientListsTableComponent},
            {path: 'list-upload', component: FileUploadComponent},
            {path: '', redirectTo: '/patient-lists', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: '/reports/patient-lists', pathMatch: 'full'},
    {path: '**', redirectTo: '/reports/patient-lists', pathMatch: 'full'}
]

@NgModule({
    declarations: [
        AppComponent,
        FileUploadComponent,
        PatientListsTableComponent,
        PriceComponent,
        GenderComponent,
        SpinnerOverlayComponent,
        ReportsComponent,
        LoginStatusComponent,
        LoginComponent,
        DeletePatientListDialogComponent,
        DepartmentComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        LayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatInputModule,
        RouterModule.forRoot(routes),
        MatStepperModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        NgxMatFileInputModule,
        MatSnackBarModule,
        MatMenuModule,
        MatCardModule,
        MatSelectModule,
        MatRadioModule,
        FormsModule,
        MatProgressSpinnerModule,
        OktaAuthModule,
        MatDialogModule
    ],
    providers: [PatientListsService,
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000}},
        {provide: OKTA_CONFIG, useValue: oktaConfig},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
