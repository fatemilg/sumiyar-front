import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManagePersonelComponent } from './manage-personel/manage-personel.component';
import { ManageAccessLevelComponent } from './manage-access-level/manage-access-level.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { ContractsComponent } from './contracts/contracts.component';




const routes: Routes = [

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'manage-personel', component: ManagePersonelComponent, canActivate: [AuthGuard] },
  { path: 'manage-access-level', component: ManageAccessLevelComponent, canActivate: [AuthGuard] },
  { path: 'manage-tasks', component: ManageTasksComponent, canActivate: [AuthGuard] },
  { path: 'contracts', component: ContractsComponent, canActivate: [AuthGuard] },
  { path: '404', component : NotFoundComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', component : NotFoundComponent}
];

export const routing = RouterModule.forRoot(routes); 
