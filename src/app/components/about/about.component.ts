import { Component, inject, OnInit, viewChild } from '@angular/core';
import { ContainerComponent } from "../container/container.component";
import { PlotlyBarChartComponent } from '../plotly-bar-chart/plotly-bar-chart.component';
import { PortfolioStore } from '../../state/portfolio-store';
import { PlotlyPieChartComponent } from '../plotly-pie-chart/plotly-pie-chart.component';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-about',
  imports: [MatExpansionModule, MatButtonModule, ContainerComponent, PlotlyBarChartComponent, PlotlyPieChartComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  portfolioStore = inject(PortfolioStore);
  accordion = viewChild.required(MatAccordion);

  ngOnInit(): void {
    this.loadProjects().then(() => console.log("Projects Loaded!"));
  }

  async loadProjects(): Promise<void>{
    this.portfolioStore.loadProjectData();
  }
}
