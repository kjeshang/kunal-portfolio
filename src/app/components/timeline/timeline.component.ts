import { Component, inject } from '@angular/core';
import { PortfolioStore } from '../../state/portfolio-store';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-timeline',
  imports: [MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {
  portfolioStore = inject(PortfolioStore);
}
