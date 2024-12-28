import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  template: `
    <div class="mat-elevation-z8">
      <mat-form-field appearance="fill">
        <mat-label>Filter</mat-label>
        <input matInput (keyup)="applyFilter($event)" placeholder="Ex. John Doe">
      </mat-form-field>
      <table mat-table [dataSource]="dataSource" matSort>

        <!-- ID Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>
          <td mat-cell *matCellDef="let element">{{element.id}}</td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
          <td mat-cell *matCellDef="let element">{{element.name}}</td>
        </ng-container>

        <!-- Age Column -->
        <ng-container matColumnDef="age">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Age</th>
          <td mat-cell *matCellDef="let element">{{element.age}}</td>
        </ng-container>

        <!-- Email Column -->
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
          <td mat-cell *matCellDef="let element">{{element.email}}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
      <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
    </div>
  `,
  styles: [`
    .mat-form-field {
      width: 100%;
    }

    table {
      width: 100%;
    }

    .mat-elevation-z8 {
      margin: 20px 0;
    }
  `]
})
export class DataTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'age', 'email'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

const ELEMENT_DATA: any[] = [
  { id: 1, name: 'John Doe', age: 25, email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
  { id: 3, name: 'Michael Johnson', age: 35, email: 'michael.johnson@example.com' },
  { id: 4, name: 'Emily Davis', age: 28, email: 'emily.davis@example.com' },
  { id: 5, name: 'William Brown', age: 40, email: 'william.brown@example.com' },
  { id: 6, name: 'Jessica Wilson', age: 22, email: 'jessica.wilson@example.com' },
  { id: 7, name: 'David Martinez', age: 33, email: 'david.martinez@example.com' },
  { id: 8, name: 'Sarah Lee', age: 29, email: 'sarah.lee@example.com' },
  { id: 9, name: 'James Anderson', age: 45, email: 'james.anderson@example.com' },
  { id: 10, name: 'Patricia Thomas', age: 38, email: 'patricia.thomas@example.com' },
  { id: 11, name: 'Robert Jackson', age: 50, email: 'robert.jackson@example.com' },
  { id: 12, name: 'Linda White', age: 27, email: 'linda.white@example.com' },
  { id: 13, name: 'Charles Harris', age: 36, email: 'charles.harris@example.com' },
  { id: 14, name: 'Barbara Clark', age: 32, email: 'barbara.clark@example.com' },
  { id: 15, name: 'Thomas Lewis', age: 41, email: 'thomas.lewis@example.com' },
  { id: 16, name: 'Nancy Walker', age: 34, email: 'nancy.walker@example.com' },
  { id: 17, name: 'Daniel Hall', age: 26, email: 'daniel.hall@example.com' },
  { id: 18, name: 'Karen Allen', age: 39, email: 'karen.allen@example.com' },
  { id: 19, name: 'Matthew Young', age: 31, email: 'matthew.young@example.com' },
  { id: 20, name: 'Betty King', age: 43, email: 'betty.king@example.com' },
];