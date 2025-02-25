import { Component } from '@angular/core';
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'app-hero',
  imports: [ContainerComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

}
