import { Component,input, InputSignal } from '@angular/core';
import { Widget } from '../../models/widget';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [],
  template: `
  
    <div class="cotainer mat-elevation-z3">
      <h3 class="m-0">{{data().name}}</h3>
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
  `

})
export class ContainerComponent {

  data: InputSignal<Widget> = input.required<Widget>();

}
