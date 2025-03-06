import { Component, inject, OnInit } from '@angular/core';
import { ContainerComponent } from "../container/container.component";
import { PlotlyBarChartComponent } from '../plotly-bar-chart/plotly-bar-chart.component';
import { PortfolioStore } from '../../state/portfolio-store';

@Component({
  selector: 'app-about',
  imports: [ContainerComponent, PlotlyBarChartComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  portfolioStore = inject(PortfolioStore);

  ngOnInit(): void {
    this.loadProjects().then(() => console.log("Projects Loaded!"));
  }

  async loadProjects(): Promise<void>{
    this.portfolioStore.loadStaticProjectData();
  }
}
