import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PersonelComponent } from './personel/personel.component';
import { AccessLevelComponent } from './access-level/access-level.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TasksComponent } from './tasks/tasks.component';
import { AuthGuard } from './auth/auth.guard';
import { ContractsComponent } from './contracts/contracts.component';
import { ActionComponent } from './action/action.component';
import { SupervisorContractsComponent } from './supervisor-contracts/supervisor-contracts.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ActivityInContractByPersonelComponent } from './reports/activity-in-contract-by-personel/activity-in-contract-by-personel.component';




const routes: Routes = [

  { path: 'action', component: ActionComponent, canActivate: [AuthGuard] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'personel', component: PersonelComponent, canActivate: [AuthGuard] },
  { path: 'access-level', component: AccessLevelComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'contracts', component: ContractsComponent, canActivate: [AuthGuard] },
  { path: 'supervisor-contract', component: SupervisorContractsComponent, canActivate: [AuthGuard] },
  { path: 'reports/activity-in-contract-by-personel', component: ActivityInContractByPersonelComponent, canActivate: [AuthGuard] },


  { path: '404', component : NotFoundComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', component : NotFoundComponent}
];

export const routing = RouterModule.forRoot(routes); 
