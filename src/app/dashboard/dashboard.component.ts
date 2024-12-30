import {Component} from "@angular/core";
import {ContainerComponent} from "../components/widget/container.component";
import {Widget} from "../models/widget";
import {
    CdkDragMove,
    DragDropModule,
} from "@angular/cdk/drag-drop";
import {ResizableModule} from "angular-resizable-element";
import {FormInputComponent} from "../components/elements/form-input/form-input.component";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {UtilsService} from "../utils.service";

@Component({
    selector: "app-dashboard",
    standalone: true,
    imports: [ContainerComponent, DragDropModule, ResizableModule, MatIcon, MatIconButton, MatMenu, MatMenuItem, MatMenuTrigger],
    template: `
        <div class="admin-dashboard">
            <!-- <div
              class="left-panel"
              [style]="'width:' + newWidth + 'px'"
              mwlResizable
              [enableGhostResize]="true"
              (resizeEnd)="onResizeEnd($event)"
            >
              <div
                class="widget-container"
                mwlResizable
                [enableGhostResize]="true"
                (resizeEnd)="onResizeEnd($event)"
              ></div>
              <div
                class="elements"
                cdkDrag
                cdkDragBoundary=".left-panel .bodyClass"
                (cdkDragEnded)="drop($event, this)"
              >
                <mat-icon>input</mat-icon>
              </div>
              <div
                class="drag-div"
                (drag)="onResizeEnd($event)"
                (dragend)="onResizeEnd($event)"
              ></div>
            </div> -->
            <button mat-icon-button [matMenuTriggerFor]="menu" class="settings-button">
                <mat-icon>list</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
                <button mat-menu-item [matMenuTriggerFor]="menuItems">Add</button>
                <mat-menu #menuItems="matMenu">
                    <button mat-menu-item (click)="utils.addItem('container', data)">container</button>
                </mat-menu>
            </mat-menu>
            <div class="bodyClass">
                @if (data) {
                    @for (container of data.children ?? []; track $index) {
                        <app-container [containerList]="data.children??[]" [data]="container"/>
                    }
                }
            </div>
        </div>
    `,
    styles: `

        .elements {
            position: absolute;
            z-index: 200;
        }

        .left-panel {
            display: flex;
            height: 100%;
            width: 10%;
            background-color: #f0f0f0;
            overflow-x: scroll;
            border: 0px;
            padding: 0px;
        }

        .drag-div {
            position: relative;
            z-index: 2;
            right: 0;
            height: 100%;
            width: 10px;
            background-color: gray;
            cursor: col-resize;
        }

        .admin-dashboard {
            display: flex;
            grid-template-columns: 100px 1fr;
            height: 100%;
            width: 100%;
        }

        .widget-container {
            position: relative;
            width: 100%;
            height: 100%;
            background-color: #f0f0f0;
            overflow-x: auto;
            border: 0px;
            padding: 0px;
        }

        .bodyClass {
            width: 90%;
            position: relative;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            grid-auto-rows: 90px;
            grid-gap: 10px;
            padding: 10px;
            box-sizing: border-box;

        }

    `,
})
export class DashboardComponent {

    constructor(protected utils: UtilsService) {
        this.data = {
            id: this.utils.uuidv4(),
            name: "Widget 1",
            rows: 1,
            columns: 1,
            content: undefined,
            children: [{
                id: this.utils.uuidv4(),
                name: "Widget 2",
                rows: 7,
                columns: 1,
                content: ContainerComponent,
                children: []
            }]
        };
    }

    moved($event: CdkDragMove<any>) {
        console.log("event", $event);

        //throw new Error('Method not implemented.');
    }

    dragStart($event: any) {
        //throw new Error('Method not implemented.');
    }

    newWidth: number = 100;
    gragDirection: string = "right | left";

    onResizeEnd(event: any) {
        if (event.clientX < 5) return;
        this.newWidth = event.clientX;
        console.log("width", this.newWidth);
        // Update the container's dimensions based on the new width and height
        //container.columns = Math.round(newWidth / 100); // Example calculation
        //container.rows = Math.round(newHeight / 100); // Example calculation
    }

    drop(event: any, element: any) {
        console.log("event", event);
        console.log("element", element);
    }

    data: Widget | undefined;

}
