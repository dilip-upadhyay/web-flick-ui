import { Component,input, InputSignal, signal } from '@angular/core';
import { Widget } from '../../models/widget';
import { MatButtonModule } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { WidgetSettingComponent } from "./widget-setting/widget-setting.component";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [MatButtonModule, MatIcon, WidgetSettingComponent],
  template: `
  
    <div class="cotainer mat-elevation-z3">
      <h3 class="m-0">{{data().name}}</h3>
      <button mat-icon-button class="settings-button" (click)="showSettings.set(true)">
        <mat-icon >settings</mat-icon>
      </button>
      @if (showSettings()) {
        <app-widget-setting [(showSettings)]="showSettings"></app-widget-setting>
      }
      
    </div>
  
    
  `,
  styles: `
  :host {
    display: block;
    border-radius: 16px;
  }

  
    
  .cotainer {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 32px;
    box-sizing: border-box;
    border-radius: inherit;
    overflow: hidden;
  }

  .settings-button{
    position: absolute;
    top: 20px;
    right:20px;
  }
  

  `,
  host: {
    '[style.grid-area]': '"span " + data().rows + " / span " + data().columns',
  }

})
export class ContainerComponent {

  data: InputSignal<Widget> = input.required<Widget>();
  showSettings = signal(false);

}