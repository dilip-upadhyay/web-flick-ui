import { Component, input } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule],
  template: `
    <div class="formInputComponent">
      <mat-form-field>
        <mat-label>{{label()}}</mat-label>
        <input matInput>
      </mat-form-field>
    </div>
  `,
  styles: `
  .formInputComponent {
    width: 100%;
  }
  `
})
export class FormInputComponent {
  label  = input.required<string>();
  value = input;
}
