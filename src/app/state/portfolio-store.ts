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
    loading: boolean;
    // Project Page Related
    query: string;
    order: 'none' | 'asc' | 'desc';
    selectedSkills: string[],
    selectedTechnologies: string[]
}

const initialPortfolioState: PortfolioState = {
    // Loading Related
    projectData: [],
    careerData: [],
    loading: false,
    // Project Page Related
    query: '',
    order: 'none',
    selectedSkills: [],
    selectedTechnologies: []
}

export const PortfolioStore = signalStore(
    { providedIn: 'root' },
    withState(initialPortfolioState),
    withMethods(
        (
            store,
            db = inject(PortfolioService),
        ) => ({
            // Loading Related
            async loadProjectData(){
                patchState(store, {loading: true})
                const projectData: Project[] = await db.getDataForProjects();
                patchState(store, (state) => ({
                    projectData: projectData, 
                    loading: false, 
                }));
            },
            async loadCareerData(){
                patchState(store, {loading: true})
                const careerData: Career[] = await db.getDataForCareer();
                patchState(store, (state) => ({
                    careerData: careerData, 
                    loading: false, 
                }));
            },
            // Project Page Related
            async updateQueryFilter(queryFilter: string){
                patchState(store, (state) => ({
                    query: queryFilter
                }))
            },
            async updateOrderFilter(orderFilter: 'none' | 'asc' | 'desc'){
                patchState(store, (state) => ({
                    order: orderFilter
                }))
            },
            async updateSelectedSkills(skillFilter: string[]){
                patchState(store, (state) => ({
                    selectedSkills: skillFilter
                }))
            },
            async updateSelectedTechnologies(technologyFilter: string[]){
                patchState(store, (state) => ({
                    selectedTechnologies: technologyFilter
                }))
            }
        })
    ),
    withComputed((
        {
            projectData,
            query,
            order,
            selectedSkills,
            selectedTechnologies
        },
        calcs = inject(PortfolioCalcsService),
        chartCalcs = inject(PortfolioChartService)
    ) => ({
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
        skillChart: computed(() => {
            return chartCalcs.getSkillBarChartData(
                projectData()
            );
        }),
        technologyChart: computed(() => {
            return chartCalcs.getTechnologyPieChartData(
                projectData()
            );
        })
    }))
);