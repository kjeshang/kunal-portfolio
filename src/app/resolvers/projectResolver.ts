import { inject } from "@angular/core";
import { PortfolioStore } from "../state/portfolio-store";
import { of } from "rxjs";

export const projectResolver = async() => {
    const portfolioStore = inject(PortfolioStore);
    await portfolioStore.loadProjectData();
    console.log("Project data loaded!")
    return of(undefined);
}