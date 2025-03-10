import { Component, inject, viewChild } from '@angular/core';
import { ContainerComponent } from "../container/container.component";
import { PortfolioStore } from '../../state/portfolio-store';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from '../timeline/timeline.component';
import { ExpertiseComponent } from '../expertise/expertise.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
    MatProgressSpinnerModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  portfolioStore = inject(PortfolioStore);
  accordion = viewChild.required(MatAccordion);
}
