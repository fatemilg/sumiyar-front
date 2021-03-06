import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { PageComponent } from './page/page.component';
import { PersonelComponent } from './personel/personel.component';
import { AccessLevelComponent } from './access-level/access-level.component';
import { routing } from './app.routing';
import { TasksComponent } from './tasks/tasks.component';
import { NumberDirective } from './directives/numbers-only.directive';
import { AuthInterceptor } from './scripts/auth_interceptor';
import { ContractsComponent } from './contracts/contracts.component';
import { DetailContractsComponent } from './detail-contracts/detail-contracts.component';
import { ActionComponent } from './action/action.component';
import { TaskHistoryComponent } from './task-history/task-history.component';
import { SupervisorContractsComponent } from './supervisor-contracts/supervisor-contracts.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ActivityInContractByPersonelComponent } from './reports/activity-in-contract-by-personel/activity-in-contract-by-personel.component'
import { Report2Component } from './reports/report2/report2.component';
import { CookieService } from 'ng2-cookies';
import { DigitalClockComponent } from './digital-clock/digital-clock.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    HeaderComponent,
    ContentComponent,
    PageComponent,
    PersonelComponent,
    AccessLevelComponent,
    TasksComponent,
    NumberDirective,
    ActionComponent,
    ContractsComponent,
    DetailContractsComponent,
    TaskHistoryComponent,
    SupervisorContractsComponent,
    ChangePasswordComponent,
    ActivityInContractByPersonelComponent,
    Report2Component,
    DigitalClockComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    routing,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [DetailContractsComponent, TaskHistoryComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }, CookieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
