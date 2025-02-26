import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-contact',
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  dialogRef = inject(MatDialogRef<ContactComponent>);
  jotFormLink: string = 'https://form.jotform.com/jsform/223584815347059';

  ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src = this.jotFormLink;
    script.async = true;
    script.onload = () => {
      setTimeout(() => {
        const iframe = document.querySelector('iframe');
        if (iframe) {
          iframe.style.width = '100%';  // Set full width
          iframe.style.maxWidth = '800px';  // Prevents it from being too wide
          iframe.style.minHeight = '600px';  // Set a reasonable height
        }
      }, 500);
    };
    document.getElementById('jotform-container')?.appendChild(script);
  }
  
}
