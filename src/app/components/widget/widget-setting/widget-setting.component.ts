import { Component, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'

@Component({
  selector: 'app-widget-setting',
  standalone: true,
  imports: [MatButtonModule, MatIcon],
  template: `
    <button mat-icon-button class="close-button" (click)="showSettings.set(false)">
      <mat-icon>close</mat-icon>
    <button>
  `,
  styles: `
  :host{
    position: absolute;
    z-index: 2;
    background: whitesmoke;
    color: black;
    top:0;
    left:0;
    border-radius: inderit;
    width: 100%;
    height: 100%;
    display: fles;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    .close-button{
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  >div{
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 8px;
  }
  
  `
})
export class WidgetSettingComponent {
  showSettings = model<boolean>(false);

}
