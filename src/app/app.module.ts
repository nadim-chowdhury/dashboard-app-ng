import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardapplicationService } from './shared/cardapplication.service';
import { DataTablesModule } from 'angular-datatables';
import { AppConfigModule } from './app-config.module';
import { NumberToWordsPipe } from './shared/number-to-words.pipe';
import { RoleListComponent } from './user/role-list/role-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { RoleFormComponent } from './user/role-form/role-form.component';
import { UserRoleFormComponent } from './user/user-role-form/user-role-form.component';
import { UserRoleListComponent } from './user/user-role-list/user-role-list.component';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { ToggleButtonComponent } from './shared/toggle-button.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { DemoMaterialModule } from './shared/meterialModules';

import { ToggleFullscreenDirectiveDirective } from './shared/toggle-fullscreen-directive.directive';

import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    AdminPanelComponent,
    ForbiddenComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    EntryFormComponent,

    NumberToWordsPipe,

    RoleListComponent,
    UserListComponent,
    UserFormComponent,
    RoleFormComponent,
    UserRoleFormComponent,
    UserRoleListComponent,

    ChangePasswordComponent,
    ToggleButtonComponent,

    ToggleFullscreenDirectiveDirective,

    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      progressBar: true,
    }),
    FormsModule,
    NgbModule,
    DataTablesModule,
    AppConfigModule,

    DemoMaterialModule,
    MatNativeDateModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    UserService,
    CardapplicationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
