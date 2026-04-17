import { inject } from "@angular/core";
import { PortfolioStore } from "../state/portfolio-store";
import { of } from "rxjs";

export const careerResolver = async() => {
    const portfolioStore = inject(PortfolioStore);
    await portfolioStore.loadProjectData();
    await portfolioStore.loadCareerData();
    console.log("Career data loaded!")
    return of(undefined);
}