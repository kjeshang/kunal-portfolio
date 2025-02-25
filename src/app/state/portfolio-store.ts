import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import { Project } from '../models/portfolio-models';
import { PortfolioService } from '../service/portfolio-service';
import { computed, inject } from '@angular/core';
import { chain, filter } from 'lodash';

// import * as staticData from '../../../public/assets/projects.json';
import { PortfolioCalcsService } from '../service/portfolio-calcs.service';

export type PortfolioState = {
    projectData: Project[];
    loading: boolean;
    query: string;
    order: 'none' | 'asc' | 'desc';
    selectedSkills: string[]
}

const initialPortfolioState: PortfolioState = {
    projectData: [],
    // projectData: (staticData as any).default || staticData,
    loading: false,
    query: '',
    order: 'none',
    selectedSkills: []
}

export const PortfolioStore = signalStore(
    { providedIn: 'root' },
    withState(initialPortfolioState),
    withMethods(
        (
            store,
            db = inject(PortfolioService)
        ) => ({
            async loadStaticProjectData(){
                patchState(store, {loading: true})
                const projectData = await db.fetchStaticProjectData();
                patchState(store, {projectData, loading: false});
            },
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
            }
        })
    ),
    withComputed((
        {
            projectData,
            query,
            order
        },
        calcs = inject(PortfolioCalcsService)
    ) => ({
        filteredProjectData: computed(() => {
            return calcs.getFilteredProjectData(
                projectData(),
                query(),
                order()
            )
        }),
        uniqueSkills: computed(() => {
            return calcs.getUniqueSkills(
                projectData()
            );
        })
    }))
);