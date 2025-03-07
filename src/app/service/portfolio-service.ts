import { inject, Injectable } from "@angular/core";
import { Career, Project } from "../models/portfolio-models";

import * as staticProjectData from '../../../public/assets/data_projects.json';
import { firstValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {
    http = inject(HttpClient);

    async fetchStaticProjectData(): Promise<Project[]>{
        await sleep(1000);
        return (staticProjectData as any).default || staticProjectData;
    }

    async getDataForProjects(): Promise<Project[]> {
        const filepath: string = "assets/data_projects.json";
        const data: Project[] = await firstValueFrom(
            this.http.get<Project[]>(filepath)
        );
        return data;
    }

    async getDataForCareer(): Promise<Career[]>{
        const filepath: string = "assets/data_career.json";
        const data: Career[] = await firstValueFrom(
            this.http.get<Career[]>(filepath)
        );
        return data;
    }
}

async function sleep(ms: number): Promise<unknown>{
    return new Promise(resolve => setTimeout(resolve, ms));
}