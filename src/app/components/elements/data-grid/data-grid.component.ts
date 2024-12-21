import {Component, input, Input, InputSignal, OnInit} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Widget} from "../../../models/widget";

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule],
  template: `
    <div class="data-grid">
      <mat-form-field appearance="fill">
        <mat-label>Filter</mat-label>
        <input matInput (keyup)="applyFilter($event)" placeholder="Ex. name">
      </mat-form-field>
      <div class="data-grid-header">
        @for (column of displayedColumns; track $index) {
            <div class="data-grid-header-cell">{{ column }}</div>
        }
      </div>
      <div class="data-grid-body">
        @for (row of dataSource.data; track $index) {
            <div class="data-grid-row">
                @for (column of displayedColumns; track $index) {
                    <div class="data-grid-cell">{{ row[column] }}</div>
                }
            </div> 
        }
      </div>
      <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
    </div>
  `,
  styles: [`
    .data-grid {
      width: 100%;
      margin: 16px 0;
    }
    .data-grid-header, .data-grid-row {
      display: flex;
    }
    .data-grid-header-cell, .data-grid-cell {
      flex: 1;
      padding: 8px;
      border-bottom: 1px solid #ccc;
    }
    .data-grid-header-cell {
      font-weight: bold;
      background-color: #f0f0f0;
    }
  `]
})
export class DataGridComponent implements OnInit {
  data: InputSignal<Widget> = input.required<Widget>();
  jsonData: any[] = [];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();

  ngOnInit() {
    this.jsonData = this.data().value.jsonData;
    if (this.jsonData.length > 0) {
      this.displayedColumns = Object.keys(this.jsonData[0]);
      this.dataSource.data = this.jsonData;
      // this.dataSource.filterPredicate = (data, filter) => {
      //   const dataStr = Object.keys(data).reduce((currentTerm, key) => {
      //     return currentTerm + (data[key] && data[key].toString().toLowerCase() || '') + ' ';
      //   }, '').trim().toLowerCase();
      //   return false;
      // };
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.data = this.jsonData.filter(row => {
      return Object.values(row).filter(item => String(item).toLowerCase().includes(filterValue)).length > 0;
    });
  }
}
