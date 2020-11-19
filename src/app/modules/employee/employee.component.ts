import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppStateTypes } from 'src/app/store/types/root.types';
import { AddEmployeeTemp, EmployeeTemp } from './employee.model';
import { EmployeeService } from './employee.service';
import { CreateEmployee, DeleteEmployee, LoadEmployeeByIdSuccess, LoadEmployeesFail, LoadEmployeesSuccess } from '../../store/actions/employee.action';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SelectorLoadEmployeesSuccess } from 'src/app/store/selectors/employee.selector';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy, AfterViewInit {
  subscription: Subscription;
  employeeData$: Observable<any>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private employeeService: EmployeeService,
    private store$: Store<AppStateTypes>,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {

    this.employeeData$ = this.store$.pipe(
      select(SelectorLoadEmployeesSuccess)
    );

    this.employeeData$.subscribe(result => {
      if (result && result.length !== 0) {
        this.dataSource.data = result.rows;
        this.totalPages = result.meta.total;
        this.dataTableTemp = result.rows;
      }
    });

  }

  displayedColumns: string[] = ['nip', 'fullName', 'nickName', 'birthDate', 'address', 'phone', 'email', 'mobile', 'action'];
  dataSource = new MatTableDataSource([]);
  totalPages = 0;
  timeout: any = null;
  dataTableTemp = [];

  isKeyupValue = '';
  isFinish = false;

  ngOnInit(): void {
    const body = new EmployeeTemp();
    body.pagination = { page: 1, perpage: 20 };
    body.sort = { sort: 'ASC', field: 'id' };


    this.store$.dispatch(new LoadEmployeesSuccess({
      payloadParam: body
    }));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
      return this.getPropertyByPath(data, sortHeaderId);
    };
  }

  applyFilter(filterValue: string) {
    this.isFinish = false;
    this.isKeyupValue = filterValue;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();

    const bodyParams = {
      query: {
        value: filterValue
      },
      pagination: {
        page: 1,
        perpage: 10
      },
      sort: {
        sort: 'ASC',
        field: 'id'
      }
    };

    setTimeout(() => {
      if (filterValue.length > 2) {
        this.employeeService.searchEmployee(bodyParams).subscribe(res => {
          this.dataSource.data = res.rows;
          this.isFinish = true;
          this.changeDetector.detectChanges();
        });
      }
    }, 1000);

    if (filterValue.length === 0) {
      this.dataSource.data = this.dataTableTemp;
      this.isFinish = true;
      this.changeDetector.detectChanges();
    }
  }

  getPropertyByPath(obj: any, pathString: string) {
    return pathString.split('.').reduce((o, i) => o[i], obj);
  }

  deleteEmployee(id: string | number) {
    const confirmAlert: boolean = confirm('Apakah Anda yakin ingin menghapus?');
    if (confirmAlert) {
      this.store$.dispatch(new DeleteEmployee({
        payloadId: id
      }));
    }
  }

  navigateEmployee(id: string | number) {
    this.router.navigateByUrl(`employee/update/${id}`);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.store$.dispatch(new LoadEmployeesFail({
        error: 'Canceled'
      }));
    }
  }

}
