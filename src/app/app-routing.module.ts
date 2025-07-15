import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent },    
    { path: 'register', component: RegisterComponent },
    { path: 'error-404', loadChildren: () => import('./error404/error404.module').then(m => m.Error404Module) },
    { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
    { path: 'post', loadChildren: () => import('./post/post.module').then(m => m.PostModule) },
    { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: '**', redirectTo: 'error-404' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {}