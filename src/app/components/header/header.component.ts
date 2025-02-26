import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  dialog = inject(MatDialog);

  isOpen: boolean = false;

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
    console.log("Menu Toggle State", this.isOpen);
  }

  openContactDialog(): void {
    this.dialog.open(ContactComponent, {
      width: '80vw',
      maxWidth: '900px',
      height: 'auto',
    });
  }

}
