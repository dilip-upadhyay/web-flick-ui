import { Component } from '@angular/core';
import { ContainerComponent } from '../components/widget/container.component';
import { Widget } from '../models/widget';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ContainerComponent],
  template: `
  <div class="dashboard">
  @for (container of data; track $index) {
   <app-container [containerList]="data" [data]="container"/>
  }
  </div>
  `,
  styles: `
.dashboard{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-auto-rows: 350px;
  grid-gap: 16px;
  padding: 16px;
  box-sizing: border-box;

}

  `
})
export class DashboardComponent {
  data: Widget[] = [{
    id: 1,
    name: 'Widget 1',
    rows: 4,
      columns: 4,
    content: ContainerComponent,
    children: [{
      id: 4,
      name: 'Widget 1_1',
      rows: 4,
      columns: 4,
      content: ContainerComponent,
      children: [{
        id: 6,
        name: 'Widget 1_1',
        rows: 1,
        columns: 1,
        content: ContainerComponent
      },{
        id: 7,
        name: 'Widget 1_2',
        rows: 1,
        columns: 1,
        content: ContainerComponent
      }]
    },{
      id: 5,
      name: 'Widget 1_2',
      rows: 1,
      columns: 1,
      content: ContainerComponent
    }]
  }, {
    id: 2,
    name: 'Widget 2',
    rows: 1,
    columns: 1,
    content: ContainerComponent
  }, {
    id: 3,
    name: 'Widget 3',
    content: ContainerComponent
  },
    
  ];
}
