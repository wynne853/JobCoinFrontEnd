import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './register-user/register-user.component';
import { MainComponent } from './main/main.component';
import { MyAreaComponent } from './my-area/my-area.component';

const routes: Routes = [
  {path:"minhaArea",component:MyAreaComponent},
  {path:"busca",component:MainComponent},
  {path:"cadastro",component:RegisterUserComponent},
  {path:"logout",component:MainComponent},
  {path:"**", redirectTo: '/busca'},
  { path: '', redirectTo: '/busca', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
