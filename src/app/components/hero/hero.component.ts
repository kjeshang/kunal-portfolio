import { Component, inject } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ConnectComponent } from '../connect/connect.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero',
  imports: [ContainerComponent, MatBottomSheetModule, MatButtonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  private _bottomSheet = inject(MatBottomSheet);

  socialMedia:{label:string, link:string, image1:string, image2:string }[] = [
    { label:"LinkedIn", 
      link:"https://www.linkedin.com/in/kunaljeshang/", 
      image1:"https://img.icons8.com/?size=100&id=8808&format=png&color=FFFFFF",
      image2:"https://img.icons8.com/?size=100&id=8808&format=png&color=000000" 
    },
    { 
      label:"GitHub", 
      link:"https://github.com/kjeshang", 
      image1:"https://img.icons8.com/?size=100&id=12599&format=png&color=FFFFFF",
      image2:"https://img.icons8.com/?size=100&id=12599&format=png&color=000000" 
    },
    { 
      label:"WordPress", 
      link:"https://kunaljeshang.wordpress.com/",
      image1:"https://img.icons8.com/?size=100&id=12510&format=png&color=FFFFFF",
      image2:"https://img.icons8.com/?size=100&id=12510&format=png&color=000000" 
    },
    {
      label:"Tumblr",
      link:"https://www.tumblr.com/kj171996",
      image1:"https://img.icons8.com/?size=100&id=8829&format=png&color=FFFFFF",
      image2:"https://img.icons8.com/?size=100&id=8829&format=png&color=000000" 
    }
  ];

  openBottomSheet(): void {
    this._bottomSheet.open(ConnectComponent, {
      data:{ socialMedia: this.socialMedia },
      ariaLabel:"Connect Bottom Sheet"
    });
  }

}
