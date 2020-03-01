import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManagePersonelComponent } from './manage-personel/manage-personel.component';
import { ManageAccessLevelComponent } from './manage-access-level/manage-access-level.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';
import { DashboardComponent } from './dashboard/dashboard.component';




const routes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'manage-personel', component: ManagePersonelComponent },
  { path: 'manage-access-level', component: ManageAccessLevelComponent },
  { path: 'manage-tasks', component: ManageTasksComponent },
  { path: '404', component : NotFoundComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component : NotFoundComponent}
];

export const routing = RouterModule.forRoot(routes);
