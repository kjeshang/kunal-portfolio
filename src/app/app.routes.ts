import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AboutComponent } from './components/about/about.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path:"", component:HeroComponent},
    {path:"about", component:AboutComponent},
    {path:"projects", component:ProjectsComponent}
];

// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
// })
// export class AppRoutes{}