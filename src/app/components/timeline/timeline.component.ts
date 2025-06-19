import { Component, inject } from '@angular/core';
import { PortfolioStore } from '../../state/portfolio-store';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipListboxChange, MatChipsModule} from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-timeline',
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    // Angular Material
    MatIconModule, 
    MatButtonModule, 
    MatCardModule, 
    MatChipsModule,
    MatProgressSpinnerModule,
    ScrollingModule
  ],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {
  portfolioStore = inject(PortfolioStore);
  private formBuilder = inject(FormBuilder);

  timelineForm = this.formBuilder.group({
    type: [this.portfolioStore.selectedType()],
  });

  onTypeChipSelection(e: MatChipListboxChange){
    this.portfolioStore.updateSelectedTypeFilter(e.value);
  }
}
