import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EnvironmentUrlService } from './services/shared/environment-url.service';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { MenuComponent } from './menu/menu.component';
import { ManagePersonelComponent } from './manage-personel/manage-personel.component';
import { ManageAccessLevelComponent } from './manage-access-level/manage-access-level.component';
import { routing } from './app.routing';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';
import { NumberDirective } from './directives/numbers-only.directive';
import { MatSortModule } from '@angular/material';
import { CookieService } from 'ng2-cookies';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogUserService } from './services/log_user.service';
import { AuthGuard } from './auth/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    HeaderComponent,
    ContentComponent,
    MenuComponent,
    ManagePersonelComponent,
    ManageAccessLevelComponent,
    ManageTasksComponent,
    NumberDirective,
    DashboardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }), 
    HttpClientModule,
    FormsModule,
    routing,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    MatSortModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
