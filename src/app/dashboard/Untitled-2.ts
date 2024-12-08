import { Component } from '@angular/core';
import { ContainerComponent } from '../components/widget/container.component';
import { Widget } from '../models/widget';
import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ResizableModule } from 'angular-resizable-element';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ContainerComponent, DragDropModule, ResizableModule],
  template: `
  <div class="admin-dashboard">
      <div class="left-panel" [style]="'width:'+newWidth+'px'"   mwlResizable [enableGhostResize]="true" (resizeEnd)="onResizeEnd($event)">
          <div class="widget-container" mwlResizable [enableGhostResize]="true" (resizeEnd)="onResizeEnd($event)">
        ladhjalskdhalsdhlafhdlaks
        alskdhaslkfdhalshdf
        <br>
        aksjhdakshd  
        </div>
          <div class="drag-div" draggable (drag)="onResizeEnd($event)" (dragend)="onResizeEnd($event)">
          </div>
      </div>
      <div class="bodyClass" DropList (cdkDropListDropped)="drop($event)">
          @for (container of data; track $index) {
          <div cdkDrag>
              <div >
                  <app-container [containerList]="data" [data]="container"></app-container>
              </div>
          </div>
      }
      </div>
  </div>
  `,
  styles: `
.left-panel{
    display: flex;
    height: 100%;
    width: 100px;
    background-color: #f0f0f0;
    overflow-x: scroll;
    border-right: 0px;
}
  .drag-div{
    flex-direction: row;
    right: 0;
    height: 100%;
    width: 7px;
    background-color: inherit;
    border-right: solid 7px #ccc;
    cursor: e-resize;
  }
  .admin-dashboard {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
  }

  .widget-container {
    position: relative;
    
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    overflow-x: auto;
  }
.bodyClass{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-auto-rows: 350px;
  grid-gap: 10px;
  padding: 10px;
  box-sizing: border-box;

}

  `
})
export class DashboardComponent {

  newWidth: number = 100;
  gragDirection: string = 'right | left';
  onResizeEnd(event: any) {
    if(event.clientX < 5)
      return
    this.newWidth = event.clientX;
    console.log('width', this.newWidth);
    // Update the container's dimensions based on the new width and height
    //container.columns = Math.round(newWidth / 100); // Example calculation
    //container.rows = Math.round(newHeight / 100); // Example calculation
  }

  drop(event: any) {
    const previousIndex = this.data.findIndex((d) => d === event.item.data);
    moveItemInArray(this.data, previousIndex, event.currentIndex);
  }
  
  data: Widget[] = [{
    id: 1,
    name: 'Widget 1',
    rows: 1,
      columns: 1,
    content: ContainerComponent,
    children: [{
      id: 4,
      name: 'Widget 1_1',
      rows: 4,
      columns: 4,
      content: ContainerComponent,
      // children: [{
      //   id: 6,
      //   name: 'Widget 1_1',
      //   rows: 1,
      //   columns: 1,
      //   content: ContainerComponent
      // },{
      //   id: 7,
      //   name: 'Widget 1_2',
      //   rows: 1,
      //   columns: 1,
      //   content: ContainerComponent
      // }]
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
