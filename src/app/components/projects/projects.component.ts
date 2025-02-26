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
    // Angular Material
    ReactiveFormsModule, 
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
export class ProjectsComponent implements OnInit {
  portfolioStore = inject(PortfolioStore);
  private _snackBar = inject(MatSnackBar);
  private formBuilder = inject(FormBuilder);

  projectForm = this.formBuilder.group({
    queryFormControl: [''],
    orderFormControl: [this.portfolioStore.order()],
    skillsFormControl: [this.portfolioStore.selectedSkills()],
    technologieFormControl: [this.portfolioStore.selectedTechnologies()]
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

  onSelectTechnology(e: MatSelectChange): void {
    const selectedTechnologies: string[] = this.projectForm.get("technologieFormControl")?.value as string[];
    console.log("Selected Technology:",e.value);
    this.portfolioStore.updateSelectedTechnologies(selectedTechnologies);
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
    this.projectForm.get("skillsFormControl")?.setValue(selectedSkills);
    this.portfolioStore.updateSelectedSkills(selectedSkills);
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
    this.projectForm.get("technologieFormControl")?.setValue(selectedTechnologies);
    this.portfolioStore.updateSelectedTechnologies(selectedTechnologies);
  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, undefined, {
      duration: 1000,
    });
  }

}
