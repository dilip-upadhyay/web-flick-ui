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
    <button mat-icon-button class="close-button" (click)="data().showSettings = false">
      <mat-icon>close</mat-icon>
    </button>
    <div>
    <button mat-icon-button  (click)="updateSettings($event, 'columns', 'decrease')">
        <mat-icon >remove_circle</mat-icon>
      </button>
      Width
      <button mat-icon-button  (click)="updateSettings($event, 'columns', 'increase')">
        <mat-icon >add_circle</mat-icon>
      </button>
    </div>
    <div>
       
      <button mat-icon-button  (click)="updateSettings($event, 'rows', 'decrease')">
        <mat-icon >remove_circle</mat-icon>
      </button>
      Height
      <button mat-icon-button  (click)="updateSettings($event, 'rows', 'increase')">
        <mat-icon >add_circle</mat-icon>
      </button>
    </div>
    <button mat-icon-button class="move-forward" (click)="swapWidgetsById(this.data().id, 'forward')">
      <mat-icon >chevron_right</mat-icon>
    </button>
    <button mat-icon-button class="move-backward" (click)="swapWidgetsById(this.data().id, 'backward')">
      <mat-icon >chevron_left</mat-icon>
    </button>
  `,
  styles: `
  :host{
    position: absolute;
    z-index: 100;
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
      z-index: 101;
    }
 
    div {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 8px;
    }
    .move-forward {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: -5px;
    }

    .move-backward {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -5px;
    }
  


  
  `
})
export class WidgetSettingComponent {

  data: InputSignal<Widget> = input.required<Widget>();
  containerList: InputSignal<Widget[]> = input.required<Widget[]>();

  updateSettings(event: any, property: 'columns' | 'rows', action: 'increase' | 'decrease') {
    this.data()[property] = 'increase' === action? (this.data()[property]?? 1) + 1 : 'decrease' === action? (this.data()[property]?? 1) - 1 : this.data()[property];
    console.log(this.data());
  }

  swapWidgetsById(id1: string, direction: 'forward' | 'backward') {
    const index1 = this.containerList().findIndex(widget => widget.id === id1);
    if ((index1 === 0 && direction === 'backward') || (index1 === this.containerList().length-1 && direction === 'forward')) {
      return;
    }

    const index2 = direction === 'forward' ? index1+1 : direction === 'backward' ? index1-1: index1;

    if (index1 === -1 || index2 === -1) {
      console.error('Invalid widget IDs');
      return;
    }
    const temp = this.containerList()[index1];
    this.containerList()[index1] = this.containerList()[index2];
    this.containerList()[index2] = temp;

  }

}
