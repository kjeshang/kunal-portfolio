import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { ProjectsComponent } from './components/projects/projects.component';


export const routes: Routes = [
    {path:"", component:HeroComponent},
    {path:"projects", component:ProjectsComponent}
];
