import { Component, inject, OnInit, viewChild } from '@angular/core';
import { ContainerComponent } from "../container/container.component";
import { PlotlyBarChartComponent } from '../plotly-bar-chart/plotly-bar-chart.component';
import { PortfolioStore } from '../../state/portfolio-store';
import { PlotlyPieChartComponent } from '../plotly-pie-chart/plotly-pie-chart.component';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from '../timeline/timeline.component';
import { ExpertiseComponent } from '../expertise/expertise.component';

@Component({
  selector: 'app-about',
  imports: [
    CommonModule, 
    ContainerComponent, 
    ExpertiseComponent,
    TimelineComponent,
    // Angular Material
    MatExpansionModule, 
    MatButtonModule, 
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  portfolioStore = inject(PortfolioStore);
  accordion = viewChild.required(MatAccordion);
}
