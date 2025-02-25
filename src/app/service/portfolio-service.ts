import { Injectable } from "@angular/core";
import { Project } from "../models/portfolio-models";

import * as staticData from '../../../public/assets/projects.json';

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {

    async fetchStaticProjectData(): Promise<Project[]>{
        await sleep(1000);
        return (staticData as any).default || staticData;
    }
}

async function sleep(ms: number): Promise<unknown>{
    return new Promise(resolve => setTimeout(resolve, ms));
}