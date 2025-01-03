import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { HttpConsumerService } from '../../services/http-consumer.service';

@Component({
  selector: 'app-data-source',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, HttpClientModule],
  template: `
    <form [formGroup]="dataSourceForm" (ngSubmit)="onSubmit()">
      <div class="form-row">
        <mat-form-field>
          <mat-label>Hostname</mat-label>
          <input matInput id="hostname" formControlName="hostname" type="text">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Port</mat-label>
          <input matInput id="port" formControlName="port" type="text">
        </mat-form-field>
      </div>
      <div class="form-row">
        <mat-form-field>
          <mat-label>Datasource Name</mat-label>
          <input matInput id="datasourceName" formControlName="datasourceName" type="text">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Database Name</mat-label>
          <input matInput id="databaseName" formControlName="databaseName" type="text">
        </mat-form-field>
      </div>
      <div class="form-row">
        <mat-form-field>
          <mat-label>Username</mat-label>
          <input matInput id="username" formControlName="username" type="text">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Password</mat-label>
          <input matInput id="password" formControlName="password" type="password">
        </mat-form-field>
      </div>
      <mat-form-field>
        <mat-label>Database</mat-label>
        <input matInput id="database" formControlName="database" type="text">
      </mat-form-field>
      <button mat-raised-button type="submit">Submit</button>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 100%;
      margin: auto;
      padding: 16px;
      box-sizing: border-box;
    }
    .form-row {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    mat-form-field {
      width: 100%;
    }
    button {
      align-self: flex-end;
    }
    @media (min-width: 600px) {
      .form-row {
        flex-direction: row;
      }
      mat-form-field {
        flex: 1;
      }
      form {
        max-width: 600px;
      }
    }
  `]
})
export class DataSourceComponent {
  dataSourceForm: FormGroup;

  constructor(private fb: FormBuilder, private httpService: HttpConsumerService) {
    this.dataSourceForm = this.fb.group({
      hostname: ['', Validators.required],
      port: ['', Validators.required],
      datasourceName: ['', Validators.required],
      databaseName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      database: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.dataSourceForm.valid) {
      this.httpService.createDataSource(this.dataSourceForm.value)
        .subscribe(response => {
          console.log(response);
        });
    }
  }
}
