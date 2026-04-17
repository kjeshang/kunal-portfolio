import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import { Career, Project } from '../models/portfolio-models';
import { PortfolioService } from '../service/portfolio-service';
import { computed, inject } from '@angular/core';

import { PortfolioCalcsService } from '../service/portfolio-calcs.service';
import { PortfolioChartService } from '../service/portfolio-chart.service';

export type PortfolioState = {
    // Loading Related
    projectData: Project[];
    careerData: Career[];
    loadingProjectData: boolean;
    loadingCareerData: boolean;
    // Project Page Related
    query: string;
    order: 'none' | 'asc' | 'desc';
    selectedSkills: string[],
    selectedTechnologies: string[]
    // About Page Related
    selectedType: string[];
}

const initialPortfolioState: PortfolioState = {
    // Loading Related
    projectData: [],
    careerData: [],
    loadingProjectData: false,
    loadingCareerData: false,
    // Project Page Related
    query: '',
    order: 'none',
    selectedSkills: [],
    selectedTechnologies: [],
    // About Page Related
    selectedType:['Job','Student','Volunteer']
}

export const PortfolioStore = signalStore(
    { providedIn: 'root' },
    withState(initialPortfolioState),
    withMethods(
        (
            store,
            db: PortfolioService = inject(PortfolioService),
        ) => ({
            // Loading Related
            async loadProjectData(){
                patchState(store, {loadingProjectData: true})
                const projectData: Project[] = await db.getDataForProjects();
                patchState(store, (state: PortfolioState) => ({
                    projectData: projectData, 
                    loadingProjectData: false, 
                }));
            },
            async loadCareerData(){
                patchState(store, {loadingCareerData: true})
                const careerData: Career[] = await db.getDataForCareer();
                patchState(store, (state: PortfolioState) => ({
                    careerData: careerData, 
                    loadingCareerData: false, 
                }));
            },
            // Project Page Related
            async updateQueryFilter(queryFilter: string){
                patchState(store, (state: PortfolioState) => ({
                    query: queryFilter
                }))
            },
            async updateOrderFilter(orderFilter: 'none' | 'asc' | 'desc'){
                patchState(store, (state: PortfolioState) => ({
                    order: orderFilter
                }))
            },
            async updateSelectedSkillsFilter(skillFilter: string[]){
                patchState(store, (state: PortfolioState) => ({
                    selectedSkills: skillFilter
                }))
            },
            async updateSelectedTechnologiesFilter(technologyFilter: string[]){
                patchState(store, (state: PortfolioState) => ({
                    selectedTechnologies: technologyFilter
                }))
            },
            // About Page Related
            async updateSelectedTypeFilter(typeFilter: string[]){
                patchState(store, (store: PortfolioState) => ({
                    selectedType: typeFilter
                }))
            }
        })
    ),
    withComputed((
        {
            // Loading Related
            projectData,
            careerData,
            // Project Page Related
            query,
            order,
            selectedSkills,
            selectedTechnologies,
            // About Page Related
            selectedType
        },
        calcs: PortfolioCalcsService = inject(PortfolioCalcsService),
        chartCalcs: PortfolioChartService = inject(PortfolioChartService)
    ) => ({
        // Project Page Related
        filteredProjectData: computed(() => {
            return calcs.getFilteredProjectData(
                projectData(),
                query(),
                order(),
                selectedSkills(),
                selectedTechnologies()
            )
        }),
        uniqueSkills: computed(() => {
            return calcs.getUniqueSkills(
                projectData()
            );
        }),
        uniqueTechnologies: computed(() => {
            return calcs.getUniqueTechnologies(
                projectData()
            )
        }),
        // About Page Related
        skillChart: computed(() => {
            return chartCalcs.getSkillBarChartData(
                projectData()
            );
        }),
        technologyChart: computed(() => {
            return chartCalcs.getTechnologyPieChartData(
                projectData()
            );
        }),
        filteredCareerData: computed(() => {
            return calcs.getFilteredCareerData(
                careerData(),
                selectedType()
            );
        }),
        uniqueType: computed(() => {
            return calcs.getUniqueType(
                careerData()
            );
        }),
        domainChart: computed(() => {
            return chartCalcs.getDomainPieChartData(
                careerData()
            );
        }),
        careerTypeChart: computed(() => {
            return chartCalcs.getCareerTypeBarChartData(
                careerData()
            )
        }),
    }))
);