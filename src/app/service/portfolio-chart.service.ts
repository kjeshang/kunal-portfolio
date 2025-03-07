import { Injectable } from "@angular/core";
import { PlotlyBarChartData, PlotlyPieChartData, Project } from "../models/portfolio-models";
import { chain } from "lodash";

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
            title:'Skills'
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
            title:'Technology'
        }
        return chartData;
    }

}