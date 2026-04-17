import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AboutComponent } from './components/about/about.component';
import { NgModule } from '@angular/core';
import { projectResolver } from './resolvers/projectResolver';
import { careerResolver } from './resolvers/careerResolver';

export const routes: Routes = [
    {path:"", component:HeroComponent},
    {
        path:"about", component:AboutComponent,
        resolve: {
            data: careerResolver
        }
    },
    {
        path:"projects", component:ProjectsComponent,
        resolve: {
            data: projectResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutes{}