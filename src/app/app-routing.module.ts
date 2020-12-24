import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';


const routes: Routes = [
  {path: "products", component: ProductsComponent},
  {path: "customers", component: CustomersComponent},
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "account", component: AccountComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {  useHash: true,})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
