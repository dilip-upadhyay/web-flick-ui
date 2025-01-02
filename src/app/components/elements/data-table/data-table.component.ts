import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  InputSignal,
  input,
  Inject,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { CommonModule } from "@angular/common";
import { Widget } from "../../../models/widget";
import { HttpConsumerService } from "../../../http-consumer.service";

@Component({
  selector: "app-data-table",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
  ],
  template: `
    <div class="mat-elevation-z8">
      <mat-form-field appearance="fill">
        <mat-label>Filter</mat-label>
        <input
          matInput
          (keyup)="applyGlobalFilter($event)"
          placeholder="Ex. John Doe"
        />
      </mat-form-field>
      <div class="table-container">
        <table mat-table [dataSource]="dataSource" matSort>
          <!-- Dynamic Columns -->
          @for(column of displayedColumns; track column) {
          <ng-container [matColumnDef]="column">
            <th mat-header-cell *matHeaderCellDef>
              <div>
                <mat-form-field appearance="fill">
                  <input
                    matInput
                    (keyup)="applyColumnFilter($event, column)"
                    placeholder="Filter {{ column }}"
                  />
                </mat-form-field>
              </div>
              <span mat-sort-header>{{ column | titlecase }}</span>
            </th>
            <td mat-cell *matCellDef="let element">{{ element[column] }}</td>
          </ng-container>
          }

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </div>
      <mat-paginator
        [pageSizeOptions]="[5, 10, 20]"
        showFirstLastButtons
      ></mat-paginator>
    </div>
  `,
  styles: [
    `
      .mat-form-field {
        width: 100%;
      }

      .table-container {
        max-height: 400px;
        overflow: auto;
      }

      table {
        width: 100%;
      }

      .mat-elevation-z8 {
        margin: 20px 0;
      }
    `,
  ],
})
export class DataTableComponent implements AfterViewInit, OnInit {
  dataSource = new MatTableDataSource();

  data: InputSignal<Widget> = input.required<Widget>();
  displayedColumns: string[] = [];
  columnFilters: { [key: string]: string } = {};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private httpConsumerService: HttpConsumerService) {}

  ngOnInit(): void {
    this.createDataSource();
  }

  private createDataSource() {
    const payload = {
      hostname: "localhost",
      port: "3306",
      datasourceName: "testDataSource",
      databaseName: "test",
      username: "root",
      password: "password",
      database: "MYSQL",
    };
    this.httpConsumerService
      .postText(
        "http://localhost:8080/web-flick-resource/create-data-source",
        payload
      )
      .subscribe((data: any) => {
        console.log(data);

        // wait for 2 seconds to fetch data
        setTimeout(() => {
          this.fetchData();
        }, 2000);
      });
  }

  private fetchData() {
    const payload = {
      datasourceName: "testDataSource",
      tableName: "test_table4",
    };
    this.httpConsumerService
      .post(
        "http://localhost:8080/web-flick-resource/fetch-data-table",
        payload
      )
      .subscribe((data: any) => {
        console.log(data);
        this.ELEMENT_DATA = data;
        if (this.data().value && this.data().value.jsonData) {
          this.ELEMENT_DATA = this.data().value.jsonData;
        }
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.setDisplayedColumnsFromElementData();
      });
  }

  setDisplayedColumnsFromElementData() {
    if (this.ELEMENT_DATA.length > 0) {
      this.displayedColumns = Object.keys(this.ELEMENT_DATA[0]);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyGlobalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.dataSource?.paginator?.firstPage();
  }

  applyColumnFilter(event: Event, column: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.columnFilters[column] = filterValue.trim().toLowerCase();
    this.dataSource.filter = this.createFilter();
  }

  createFilter(): string {
    const filterFunction = (data: any, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return Object.keys(searchTerms).every((key) => {
        return data[key].toString().toLowerCase().includes(searchTerms[key]);
      });
    };
    this.dataSource.filterPredicate = filterFunction;
    return JSON.stringify(this.columnFilters);
  }

  ELEMENT_DATA: any[] = [];
}
