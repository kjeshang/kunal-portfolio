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

import * as staticData from '../../../public/assets/projects.json';

export type PortfolioState = {
    projectData: Project[];
    loading: boolean;
    query: string;
}

const initialPortfolioState: PortfolioState = {
    projectData: [],
    // projectData: (staticData as any).default || staticData,
    loading: false,
    query: ''
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
            }
        })
    ),
    withComputed((
        {
            projectData,
            query
        }
    ) => ({
        filteredProjectData: computed(() => {
            const data: Project[] = chain(projectData())
                .filter(el => el.title.toLowerCase().includes(query().toLowerCase()))
                .value();
            return data;
        })
    }))
);