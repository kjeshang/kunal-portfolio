import { inject, Injectable } from "@angular/core";
import { Career, CareerView, PlotlyBarChartData, PlotlyPieChartData, Project } from "../models/portfolio-models";
import { chain, uniqBy } from "lodash";
import { DateTime, Duration } from "luxon";

@Injectable({providedIn:'root'})
export class PortfolioChartService {

    getSkillBarChartData(
        projectData: Project[]
    ): PlotlyBarChartData{
        const data: {skill: string, count:number}[] = chain(projectData)
            .groupBy(item => `${item.skill}`)
            .map(items => {
                const {skill} = items[0];
                const count: number = items.length;
                const result: {skill: string, count:number} = {skill, count};
                return result;
            })
            .sortBy(['count','skill'])
            .reverse()
            .value();
        
        const chartData: PlotlyBarChartData = {
            x:data.map(item => item.skill),
            y:data.map(item => item.count),
            title:'Skills',
            height:400
        }
        return chartData;
    }

    getSkillPieChartData(
        projectData: Project[]
    ): PlotlyPieChartData{
        const data: {skill: string, count:number}[] = chain(projectData)
            .groupBy(item => `${item.skill}`)
            .map(items => {
                const {skill} = items[0];
                const count: number = items.length;
                const result: {skill: string, count:number} = {skill, count};
                return result;
            })
            .sortBy(['count','skill'])
            .reverse()
            .value();
        
        const chartData: PlotlyPieChartData = {
            labels:data.map(item => item.skill),
            values:data.map(item => item.count),
            title:'Skills',
            hole: 0,
        }
        return chartData;
    }

    getTechnologyBarChartData(
        projectData: Project[]
    ): PlotlyBarChartData{
        const data: {technology: string, count:number}[] = chain(projectData)
            .groupBy(item => `${item.technology}`)
            .map(items => {
                const {technology} = items[0];
                const count: number = items.length;
                const result: {technology: string, count:number} = {technology, count};
                return result;
            })
            .sortBy(['count','technology'])
            .reverse()
            .value();
        
        const chartData: PlotlyBarChartData = {
            x:data.map(item => item.technology),
            y:data.map(item => item.count),
            title:'Technology',
            height:300
        }
        return chartData;
    }

    getTechnologyPieChartData(
        projectData: Project[]
    ): PlotlyPieChartData{
        const data: {technology: string, count:number}[] = chain(projectData)
            .groupBy(item => `${item.technology}`)
            .map(items => {
                const {technology} = items[0];
                const count: number = items.length;
                const result: {technology: string, count:number} = {technology, count};
                return result;
            })
            .sortBy(['count','technology'])
            .reverse()
            .value();
        
        const chartData: PlotlyPieChartData = {
            labels:data.map(item => item.technology),
            values:data.map(item => item.count),
            title:'Technology',
            hole: 0,
        }
        return chartData;
    }
    
    getDomainPieChartData(careerData: Career[]){
        const careerViewData: CareerView[] =  chain(careerData)
        .filter((el: Career) => el.type === 'Job')
        .map((item: Career) => {
            const parsedStartDate: number = DateTime.fromFormat(item.startDate, "MMM yyyy", { locale: "en" }).toMillis();
            const parsedEndDate: number = item.endDate !== "Current" ? DateTime.fromFormat(item.endDate, "MMM yyyy", { locale: "en" }).toMillis() : Infinity;
            
            let yearsOfExperience: number = 0;
            if(item.endDate === 'Current'){
                yearsOfExperience = Duration.fromMillis(DateTime.now().toMillis() - parsedStartDate).as('years');
            }
            else {
                yearsOfExperience = Duration.fromMillis(parsedEndDate - parsedStartDate).as('years');
            }

            if(!item.fulltime){
                yearsOfExperience = yearsOfExperience / 2;
            }
            const result: CareerView = {
                ...item,
                parsedStartDate,
                parsedEndDate,
                yearsOfExperience
            }
            return result;
        })
        .value();

        const uniqueDomains: string[] = chain(careerViewData)
            .map(item => item.domain)
            .uniq()
            .sort()
            .value();
        console.log(uniqueDomains);

        let data: {domain: string, count: number}[] = [];

        for(let i=0; i < uniqueDomains.length; i++){
            const domain: string = uniqueDomains[i];
            const count: number = chain(careerViewData)
                .filter((item: CareerView) => item.type === "Job")
                .filter((item: CareerView) => item.domain === domain)
                .sumBy('yearsOfExperience')
                .value();
            data.push({domain, count});
        }

        const chartData: PlotlyPieChartData = {
            labels:data.map(item => item.domain),
            values:data.map(item => item.count),
            title:'Domain',
            hole: 0.6
        }

        console.log(data);
        console.log(chartData);

        return chartData;
    }
        
}