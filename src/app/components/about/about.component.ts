import { Component, inject, OnInit, viewChild } from '@angular/core';
import { ContainerComponent } from "../container/container.component";
import { PlotlyBarChartComponent } from '../plotly-bar-chart/plotly-bar-chart.component';
import { PortfolioStore } from '../../state/portfolio-store';
import { PlotlyPieChartComponent } from '../plotly-pie-chart/plotly-pie-chart.component';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule, MatExpansionModule, MatButtonModule, ContainerComponent, PlotlyBarChartComponent, PlotlyPieChartComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  portfolioStore = inject(PortfolioStore);
  accordion = viewChild.required(MatAccordion);
}
