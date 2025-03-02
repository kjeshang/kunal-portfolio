import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    {path:"", component:HeroComponent},
    {path:"about", component:AboutComponent},
    {path:"projects", component:ProjectsComponent}
];