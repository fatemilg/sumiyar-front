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
import { ManagePersonelComponent } from './manage-personel/manage-personel.component';
import { ManageAccessLevelComponent } from './manage-access-level/manage-access-level.component';
import { routing } from './app.routing';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';
import { NumberDirective } from './directives/numbers-only.directive';
import { AuthInterceptor } from './scripts/auth_interceptor';
import { ContractsComponent } from './contracts/contracts.component';
import { DetailContractsComponent } from './detail-contracts/detail-contracts.component';
import { ActionComponent } from './action/action.component';


// import { CookieService } from 'ng2-cookies';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    HeaderComponent,
    ContentComponent,
    PageComponent,
    ManagePersonelComponent,
    ManageAccessLevelComponent,
    ManageTasksComponent,
    NumberDirective,
    ActionComponent,
    ContractsComponent,
    DetailContractsComponent
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
  entryComponents: [ContractsComponent, DetailContractsComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
