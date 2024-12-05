import { Component, input, InputSignal, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon'
import { Widget } from '../../../models/widget';

@Component({
  selector: 'app-widget-setting',
  standalone: true,
  imports: [MatButtonModule, MatIcon, MatButtonToggleModule],
  template: `
    <button mat-icon-button class="close-button" (click)="showSettings.set(false)">
      <mat-icon>close</mat-icon>
</button>
      <div>
        Width
        <mat-button-toggle-group hideSingleSelectionIndicator="true" (change)="updateSettings($event, 'columns')" [value]="data().columns ?? 1">
          <mat-button-toggle [value]="1">1</mat-button-toggle>
          <mat-button-toggle [value]="2">2</mat-button-toggle>
          <mat-button-toggle [value]="3">3</mat-button-toggle>
          <mat-button-toggle [value]="4">4</mat-button-toggle>
        </mat-button-toggle-group>
      </div>
      <div>
        Height
        <mat-button-toggle-group hideSingleSelectionIndicator="true" (change)="updateSettings($event, 'rows')" [value]="data().rows ?? 1">
          <mat-button-toggle [value]="1">1</mat-button-toggle>
          <mat-button-toggle [value]="2">2</mat-button-toggle>
          <mat-button-toggle [value]="3">3</mat-button-toggle>
          <mat-button-toggle [value]="4">4</mat-button-toggle>
        </mat-button-toggle-group>
      </div>
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

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    --mat-standard-button-toggle-height: 16px;
  }

    .close-button{
      position: absolute;
      top: 0;
      right: 0;
    }
 
    div {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 8px;
  }


  
  `
})
export class WidgetSettingComponent {

  updateSettings(event: any, property: 'columns' | 'rows') {
    this.data()[property] = event.value;
  }


  showSettings = model<boolean>(false);
  data: InputSignal<Widget> = input.required<Widget>();

}
