import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { PortfolioStore } from '../../state/portfolio-store';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonToggleChange, MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-projects',
  imports: [
    ContainerComponent, 
    CommonModule, 
    FormsModule,
    ReactiveFormsModule, 
    MatCardModule, 
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
  portfolioStore = inject(PortfolioStore);
  private formBuilder = inject(FormBuilder);

  projectForm = this.formBuilder.group({
    queryFormControl: [''],
    orderFormControl: [this.portfolioStore.order()],
    skillsFormControl: [this.portfolioStore.selectedSkills()]
  });

  ngOnInit(): void {
    this.loadProjects().then(() => console.log("Projects Loaded!"));
  }

  async loadProjects(): Promise<void>{
    this.portfolioStore.loadStaticProjectData();
  }

  onQueryInput(): void {
    const query: string = this.projectForm.get("queryFormControl")?.value as string;
    this.portfolioStore.updateQueryFilter(query);
    console.log(this.portfolioStore.query());
  }

  onOrderButtonToggle(e: MatButtonToggleChange): void {
    const order: 'none' | 'asc' | 'desc' = this.projectForm.get("orderFormControl")?.value as 'none' | 'asc' | 'desc';
    console.log("Order:",e.value);
    this.portfolioStore.updateOrderFilter(order); 
  }

  onSelectSkill(e: MatSelectChange): void {
    const selectedSkills: string[] = this.projectForm.get("skillsFormControl")?.value as string[];
    console.log("Selected Skills:",e.value);
    this.portfolioStore.updateSelectedSkills(selectedSkills);
  }

}
