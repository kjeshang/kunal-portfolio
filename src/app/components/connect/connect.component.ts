import { Component, Inject, inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-connect',
  imports: [],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.css'
})
export class ConnectComponent {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<ConnectComponent>>(MatBottomSheetRef);

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) 
    public data: { socialMedia: {label:string, link:string, image1: string, image2:string}[] }
  ) { }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
  }
  
}
