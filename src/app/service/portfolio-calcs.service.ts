import { Injectable } from "@angular/core";
import { Project } from "../models/portfolio-models";
import { chain, uniqBy } from "lodash";

@Injectable({
    providedIn: 'root'
})
export class PortfolioCalcsService {

    getUniqueSkills(
        projectData: Project[]
    ): string[]{
        const uniqueSkills: string[] = chain(projectData)
            .map(item => item.skill)
            .uniq()
            .sort()
            .value();
        return uniqueSkills;
    }
    
    getFilteredProjectData(
        projectData: Project[],
        query: string,
        order: 'none' | 'asc' | 'desc'
    ): Project[]{
        let data: Project[] = []
            switch(order){
                case 'desc':
                    data = chain(projectData)
                        .filter(el => el.title.toLowerCase().includes(query.toLowerCase()))
                        .sortBy(["title"])
                        .reverse()
                        .value();
                    break;
                case 'asc':
                    data = chain(projectData)
                        .filter(el => el.title.toLowerCase().includes(query.toLowerCase()))
                        .sortBy(["title"])
                        .value();
                    break;
                default:
                    data = chain(projectData)
                        .filter(el => el.title.toLowerCase().includes(query.toLowerCase()))
                        .value();
                    break;
            }
        return data;
    }
}