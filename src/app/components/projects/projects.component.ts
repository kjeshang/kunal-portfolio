import { Component, inject, OnInit } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { PortfolioStore } from '../../state/portfolio-store';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


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
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  providers: [],
})
export class ProjectsComponent implements OnInit {
  portfolioStore = inject(PortfolioStore);
  private formBuilder = inject(FormBuilder);

  projectForm = this.formBuilder.group({
    queryFormControl: ['']
  });

  ngOnInit(): void {
    this.loadProjects().then(() => console.log("Projects Loaded!"));
  }

  async loadProjects(): Promise<void>{
    this.portfolioStore.loadStaticProjectData();
  }

  onInput(): void {
    const query: string = this.projectForm.get("queryFormControl")?.value as string;
    this.portfolioStore.updateQueryFilter(query);
    console.log(this.portfolioStore.query());
  }

}
