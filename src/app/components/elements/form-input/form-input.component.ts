import { Component, input, InputSignal, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Widget } from '../../../models/widget';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule],
  template: `
    <div class="formInputComponent">
      <mat-form-field>
        <mat-label>{{this.data().name}}</mat-label>
        <input matInput [value]="value" (change)="updateData($event)">
      </mat-form-field>
    </div>
  `,
  styles: `
  .formInputComponent {
    width: 100%;
    margin: 10px 0;
    padding: 0 10px;
    color: red;
  }
  `
})
export class FormInputComponent implements OnInit {

  //label  = input.required<string>();
  value = '';
  data: InputSignal<Widget> = input.required<Widget>();

  ngOnInit(): void {
    ///console.log('label', this.label);
    //console.log('value', this.value);
    this.value = this.data().value;
  }

  updateData(event: any) {
    this.data().value = event.target.value;

  }


}