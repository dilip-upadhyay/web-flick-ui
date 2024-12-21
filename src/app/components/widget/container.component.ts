import {Component, input, InputSignal, signal, OnInit, Inject} from '@angular/core';
import {Widget} from '../../models/widget';
import {MatButtonModule} from '@angular/material/button'
import {MatIcon} from '@angular/material/icon'
import {WidgetSettingComponent} from "./widget-setting/widget-setting.component";
import {FormInputComponent} from '../elements/form-input/form-input.component';
import {NgComponentOutlet} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {UtilsService} from "../../utils.service";


@Component({
    selector: 'app-container',
    standalone: true,
    imports: [MatButtonModule, MatMenuModule, MatIcon, WidgetSettingComponent, NgComponentOutlet],
    template: `

        <div class="cotainer mat-elevation-z3">
            <!-- <h3 class="m-0">{{data().name}}</h3> -->

            <button mat-icon-button [matMenuTriggerFor]="menu" class="settings-button">
                <mat-icon>list</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
                <button mat-menu-item [matMenuTriggerFor]="menuItems">Add</button>
                <mat-menu #menuItems="matMenu">
                    <button mat-menu-item (click)="utils.addItem('input', data())">input field</button>
                    <button mat-menu-item (click)="utils.addItem('container', data())">container</button>
                </mat-menu>
                <button mat-menu-item (click)="utils.openSettings(data())">Settings</button>
                <button mat-menu-item (click)="utils.removeItem(data(), containerList())">Remove</button>
            </mat-menu>

            @if (data().showSettings) {
                <app-widget-setting [data]="data()" [containerList]="containerList()"></app-widget-setting>
            }
            @if ((data().children ?? []).length > 0) {
                @for (container of data().children; track $index) {
                    @if (container.content) {
                        <div class="widget-container">
                            <ng-container [ngComponentOutlet]="container.content" [ngComponentOutletInputs]="{ data: container}"/>
                        </div>
                    } @else {
                        <app-container [containerList]="data().children ?? []" [data]="container"/>
                    }

                }
            }

        </div>


    `,
    styles: `
        :host {
            display: block;
            border-radius: 16px;
        }


        .cotainer {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            position: relative;
            height: 100%;
            width: 100%;
            padding: 32px;
            box-sizing: border-box;
            border-radius: inherit;
            overflow: scroll;
        }

        .settings-button {
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 100;
        }


    `,
    host: {
        '[style.grid-area]': '"span " + data().rows + " / span " + data().columns',
    }

})
export class ContainerComponent implements OnInit {
    data: InputSignal<Widget> = input.required<Widget>();
    containerList: InputSignal<Widget[]> = input.required<Widget[]>();

    constructor(protected utils: UtilsService) {
    }

    ngOnInit() {
        console.log(this.data());
    }



}
