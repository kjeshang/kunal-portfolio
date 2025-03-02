import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-contact',
  imports: [MatButtonModule, MatDialogContent, MatDividerModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  dialogRef = inject(MatDialogRef<ContactComponent>);
  jotFormLink: string = 'https://form.jotform.com/jsform/223584815347059';

  ngAfterViewInit(): void {
    // Create a new <script> element dynamically
    const script: HTMLScriptElement = document.createElement('script');
    // Set the script's source to the JotForm link stored in this.jotFormLink
    script.src = this.jotFormLink;
    // Enable asynchronous loading to prevent blocking the page rendering
    script.async = true;
    // Define a callback function to execute when the script has finished loading
    script.onload = () => {
      // Use a setTimeout to delay execution slightly, allowing the iframe to load
      setTimeout(() => {
        // Select the first <iframe> element on the page
        const iframe: HTMLIFrameElement | null = document.querySelector('iframe');
        // If an iframe is found, apply styles to control its size
        if (iframe) {
          iframe.style.width = '100%';  // Set full width
          iframe.style.maxWidth = '800px';  // Prevents it from being too wide
          iframe.style.minHeight = '600px';  // Set a reasonable height
        }
      }, 500); // Delay of 500ms to ensure iframe is rendered
    };
     // Find the element with the ID 'jotform-container' and append the script to it
    document.getElementById('jotform-container')?.appendChild(script);
  }

  // ngAfterViewInit(): void {
  //   const script = document.createElement('script');
  //   script.src = this.jotFormLink;
  //   script.async = true;
  
  //   script.onload = () => {
  //     const observer = new MutationObserver(() => {
  //       const iframe = document.querySelector('iframe');
  //       if (iframe) {
  //         iframe.style.width = '100%';  
  //         iframe.style.maxWidth = '800px';  
  //         iframe.style.minHeight = '600px';  
  //         observer.disconnect(); // Stop observing once applied
  //       }
  //     });
  
  //     observer.observe(document.body, { childList: true, subtree: true });
  //   };
  
  //   script.onerror = () => {
  //     console.error('Failed to load JotForm script:', this.jotFormLink);
  //   };
  
  //   document.getElementById('jotform-container')?.appendChild(script);
  // }
  
}
