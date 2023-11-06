import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './common-component/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'auth',pathMatch:'full'},
  {path:'auth',loadChildren:()=>import('./auth/auth/auth.module').then(m=>m.AuthModule)},
  {path:'home',canActivate:[AuthGuard],loadChildren:()=>import('./components/dashboard/dashboard.module').then(m=>m.DashboardModule)},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
