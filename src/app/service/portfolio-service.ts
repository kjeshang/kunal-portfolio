import { inject, Injectable } from "@angular/core";
import { Project } from "../models/portfolio-models";

import * as staticData from '../../../public/assets/data_projects.json';
import { firstValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {
    http = inject(HttpClient);

    async fetchStaticProjectData(): Promise<Project[]>{
        await sleep(1000);
        return (staticData as any).default || staticData;
    }

    async getDataForProjects(): Promise<Project[]> {
        const filepath: string = "assets/data_projects.json";
        const data: Project[] = await firstValueFrom(
            this.http.get<Project[]>(filepath)
        );
        return data;
    }
}

async function sleep(ms: number): Promise<unknown>{
    return new Promise(resolve => setTimeout(resolve, ms));
}