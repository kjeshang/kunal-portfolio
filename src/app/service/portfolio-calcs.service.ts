import { Injectable } from "@angular/core";
import { Career, CareerView, Project } from "../models/portfolio-models";
import { chain, uniqBy } from "lodash";
import { DateTime } from "luxon";

@Injectable({
    providedIn: 'root'
})
export class PortfolioCalcsService {

    // Filter Options ---------------------------------------------------------------

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

    // Filtered Data -------------------------------------------------------------
    
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

    getFilteredCareerData(
        careerData: Career[]
    ): CareerView[]{
        let data: CareerView[] = chain(careerData)
            .map(item => {
                const parsedStartDate: number = DateTime.fromFormat(item.startDate, "MMM yyyy", { locale: "en" }).toMillis();
                const parsedEndDate: number = item.endDate !== "Current" ? DateTime.fromFormat(item.endDate, "MMM yyyy", { locale: "en" }).toMillis() : Infinity;
                const result: CareerView = {
                    ...item,
                    parsedStartDate,
                    parsedEndDate
                }
                return result;
            })
            .orderBy(["parsedEndDate", "parsedStartDate"],["desc", "desc"])
            .value();
        return data;
    }
}