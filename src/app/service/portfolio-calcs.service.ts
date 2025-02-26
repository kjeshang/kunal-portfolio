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

    getUniqueTechnologies(
        projectData: Project[]
    ): string[] {
        const uniqueTechnologies: string[] = chain(projectData)
            .map(item => item.technology)
            .uniq()
            .sort()
            .value();
        return uniqueTechnologies
    }
    
    getFilteredProjectData(
        projectData: Project[],
        query: string,
        order: 'none' | 'asc' | 'desc',
        selectedSkills: string[],
        selectedTechnologies: string[]
    ): Project[]{
        let data: Project[] = chain(projectData)
            .filter(el => 
                el.title.toLowerCase().includes(query.toLowerCase()) ||
                el.skill.toLowerCase().includes(query.toLowerCase()) ||
                el.technology.toLowerCase().includes(query.toLowerCase())
            )
            .filter(el => selectedSkills.includes(el.skill) || selectedSkills.length == 0)
            .filter(el => selectedTechnologies.includes(el.technology) || selectedTechnologies.length == 0)
            .value();

            switch(order){
                case 'desc':
                    data = chain(data).sortBy(["title"]).reverse().value();
                    break;
                case 'asc':
                    data = chain(data).sortBy(["title"]).value();
                    break;
                default:
                    data = chain(data).value();
                    break;
            }
        return data;
    }
}