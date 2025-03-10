import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-projects',
  imports: [
    ContainerComponent, 
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    // Angular Material
    MatCardModule, 
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    MatExpansionModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  portfolioStore = inject(PortfolioStore);
  private _snackBar = inject(MatSnackBar);
  private formBuilder = inject(FormBuilder);

  projectForm = this.formBuilder.group({
    query: [''],
    order: [this.portfolioStore.order()],
    skills: [this.portfolioStore.selectedSkills()],
    technologies: [this.portfolioStore.selectedTechnologies()]
  });

  onQueryInput(): void {
    const query: string = this.projectForm.get("query")?.value as string;
    this.portfolioStore.updateQueryFilter(query);
    console.log(this.portfolioStore.query());
  }

  onOrderButtonToggle(e: MatButtonToggleChange): void {
    const order: 'none' | 'asc' | 'desc' = this.projectForm.get("order")?.value as 'none' | 'asc' | 'desc';
    console.log("Order:",e.value);
    this.portfolioStore.updateOrderFilter(order); 
  }

  onSelectSkill(e: MatSelectChange): void {
    const selectedSkills: string[] = this.projectForm.get("skills")?.value as string[];
    console.log("Selected Skills:",e.value);
    this.portfolioStore.updateSelectedSkillsFilter(selectedSkills);
  }

  onSelectTechnology(e: MatSelectChange): void {
    const selectedTechnologies: string[] = this.projectForm.get("technologies")?.value as string[];
    console.log("Selected Technology:",e.value);
    this.portfolioStore.updateSelectedTechnologiesFilter(selectedTechnologies);
  }

  onClickSkillButton(skill: string): void {
    let selectedSkills: string[] = [...this.portfolioStore.selectedSkills()];
    if(selectedSkills.includes(skill)){
      selectedSkills = selectedSkills.filter(item => item !== skill);
      this.openSnackBar(`Removed ${skill}`)
    }
    else{
      selectedSkills.push(skill);
      this.openSnackBar(`Added ${skill}`)
    }
    this.projectForm.get("skills")?.setValue(selectedSkills);
    this.portfolioStore.updateSelectedSkillsFilter(selectedSkills);
  }

  onClickTechnologyMatChip(technology: string): void {
    let selectedTechnologies: string[] = [...this.portfolioStore.selectedTechnologies()];
    if(selectedTechnologies.includes(technology)){
      selectedTechnologies = selectedTechnologies.filter(item => item !== technology);
      this.openSnackBar(`Removed ${technology}`)
    }
    else{
      selectedTechnologies.push(technology);
      this.openSnackBar(`Added ${technology}`)
    }
    this.projectForm.get("technologies")?.setValue(selectedTechnologies);
    this.portfolioStore.updateSelectedTechnologiesFilter(selectedTechnologies);
  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, undefined, {
      duration: 1000,
    });
  }

}
