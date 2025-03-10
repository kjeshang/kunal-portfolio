import { Component, inject } from '@angular/core';
import { PlotlyBarChartComponent } from '../plotly-bar-chart/plotly-bar-chart.component';
import { PlotlyPieChartComponent } from '../plotly-pie-chart/plotly-pie-chart.component';
import { PortfolioStore } from '../../state/portfolio-store';

@Component({
  selector: 'app-expertise',
  imports: [
    PlotlyBarChartComponent, 
    PlotlyPieChartComponent, 
  ],
  templateUrl: './expertise.component.html',
  styleUrl: './expertise.component.css'
})
export class ExpertiseComponent {
  portfolioStore = inject(PortfolioStore);
}
