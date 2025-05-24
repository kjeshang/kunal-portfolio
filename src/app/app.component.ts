import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PortfolioStore } from './state/portfolio-store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'kunal-portfolio';
  portfolioStore = inject(PortfolioStore);

  ngOnInit(): void {
    this.loadData().then(() => console.log("Data Loaded!"));
  }

  async loadData(): Promise<void>{
    this.portfolioStore.loadProjectData();
    this.portfolioStore.loadCareerData();
  }
}
