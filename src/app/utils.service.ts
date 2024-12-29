import { Injectable } from '@angular/core';
import {Widget} from "./models/widget";
import {FormInputComponent} from "./components/elements/form-input/form-input.component";
import {ContainerComponent} from "./components/widget/container.component";
import {DataGridComponent} from "./components/elements/data-grid/data-grid.component";
import { DataTableComponent } from './components/elements/data-table/data-table.component';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
    sampleData = [
        { id: 1, name: 'John Doe', age: 28, email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Smith', age: 34, email: 'jane.smith@example.com' },
        { id: 3, name: 'Michael Johnson', age: 45, email: 'michael.johnson@example.com' },
        { id: 4, name: 'Emily Davis', age: 23, email: 'emily.davis@example.com' },
        { id: 1, name: 'John Doe', age: 28, email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Smith', age: 34, email: 'jane.smith@example.com' },
        { id: 3, name: 'Michael Johnson', age: 45, email: 'michael.johnson@example.com' },
        { id: 4, name: 'Emily Davis', age: 23, email: 'emily.davis@example.com' },
        { id: 1, name: 'John Doe', age: 28, email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Smith', age: 34, email: 'jane.smith@example.com' },
        { id: 3, name: 'Michael Johnson', age: 45, email: 'michael.johnson@example.com' },
        { id: 4, name: 'Emily Davis', age: 23, email: 'emily.davis@example.com' }
    ];

  constructor() { }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
          const r = Math.random() * 16 | 0,
              v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
  }

    swapWidgetsById(id1: string, direction: 'forward' | 'backward', containerList: Widget[]) {
        const index1 = containerList.findIndex(widget => widget.id === id1);
        if ((index1 === 0 && direction === 'backward') || (index1 === containerList.length - 1 && direction === 'forward')) {
            return;
        }

        const index2 = direction === 'forward' ? index1 + 1 : direction === 'backward' ? index1 - 1 : index1;

        if (index1 === -1 || index2 === -1) {
            console.error('Invalid widget IDs');
            return;
        }
        const temp = containerList[index1];
        containerList[index1] = containerList[index2];
        containerList[index2] = temp;

    }
    addItem(type: any | "input" | "container"| "data-grid", data: Widget | any) {
        console.log('Add item');

        // Implement add item logic here
        switch (type) {
            case "input": {
                let child: Widget = {
                    id: this.uuidv4(),
                    children: [],
                    content: FormInputComponent,
                    name: "new input filed",
                    value: "new value"
                };
                data.children?.push(child);
                break;
            }
            case "container": {
                let child: Widget = {
                    id: this.uuidv4(),
                    children: [],
                    content: ContainerComponent,
                    name: "new container",
                    value: "new value"
                };
                data.children?.push(child);
                break;
            }
            case "data-grid": {
                let child: Widget = {
                    id: this.uuidv4(),
                    children: [],
                    content: DataTableComponent,
                    name: "new container",
                    value: {jsonData:this.sampleData, displayedColumns: Object.keys(this.sampleData[0])}
                };
                data.children?.push(child);
                break;
            }
            default: {
                //statements;
                break;
            }
        }
    }

    openSettings(data: Widget) {
        console.log('Open settings');
        data.showSettings = true;
    }

    removeItem(data: Widget, containerList: Widget[]) {
        console.log('Remove item');
        const widgets = containerList.filter(widget => widget.id !== data.id);
        containerList.splice(0, containerList.length);
        containerList.push( ...widgets);


    }
}
