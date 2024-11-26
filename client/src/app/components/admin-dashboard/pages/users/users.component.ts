import { type User } from './../../../../model/user.model';
import {
  Component,
  inject,
  OnInit,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserDataSharingService } from '../../../../services/user-data-sharing.service';
import { TitleCasePipe } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatTableModule,
    TitleCasePipe,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatSort,
    MatButtonModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  private userService = inject(UserDataSharingService);
  datasource = new MatTableDataSource<User>([]);
  selection = new SelectionModel<User>(true, []);
  searchUser = new FormControl('');
  totalCount = signal<number>(0);
  sort = signal<any>(undefined);
  role = signal<any>(undefined);
  status = signal<any>(undefined);
  search = signal<any>(undefined);
  page = signal<any>(undefined);
  limit = signal<any>(undefined);
  @ViewChild(MatSort) sorting!: MatSort;
  private toaster = inject(ToastrService);

  displayedColumns: string[] = [
    'select',
    'firstName',
    'lastName',
    'email',
    'city',
    'Role',
    'status',
    'actions',
  ];
  ngOnInit(): void {
    this.fetchAllUser();
    this.searchUser.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (res) => {
          this.search.set(res);
          this.fetchAllUser(
            this.search(),
            this.sort(),
            this.role(),
            this.status(),
            this.page(),
            this.limit()
          );
        },
      });
  }

  fetchAllUser(
    search?: string,
    sort?: string,
    role?: string,
    status?: string,
    page?: number,
    limit?: number
  ) {
    return this.userService
      .getAllUsrs(search, sort, role, status, page, limit)
      .subscribe({
        next: (res) => {
          this.totalCount.set(res.data.count);
          this.datasource.data = res.data.rows;
          this.search.set(undefined);
          this.sort.set(undefined);
          this.role.set(undefined);
          this.status.set(undefined);
          this.page.set(undefined);
          this.limit.set(undefined);
        },
      });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.datasource.data.length;
    return numSelected == numRows;
  }
  isAnyItemSelected() {
    return this.selection.selected.length > 0;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.datasource.data.forEach((row) => this.selection.select(row));
  }

  pageEvent(event: any) {
    console.log('Current page index:', event.pageIndex);
    console.log('Page size:', event.pageSize);
    console.log('Total length:', event.length);
    this.page.set(event.pageIndex + 1);
    this.limit.set(event.pageSize);
    this.fetchAllUser(
      this.search(),
      this.sort(),
      this.role(),
      this.status(),
      this.page(),
      this.limit()
    );
  }

  // filtering
  filterRole(field: string) {
    this.role.set(field);
    this.fetchAllUser(
      this.search(),
      this.sort(),
      this.role(),
      this.status(),
      this.page(),
      this.limit()
    );
  }
  filterStatus(field: string) {
    this.status.set(field);
    this.fetchAllUser(
      this.search(),
      this.sort(),
      this.role(),
      this.status(),
      this.page(),
      this.limit()
    );
  }

  //sorting--
  mysort(columnName: string) {
    if (this.sorting.direction === 'asc') {
      this.sort.set(columnName);
    } else if (this.sorting.direction == 'desc') {
      this.sort.set(`-${columnName}`);
    } else {
      this.sort.set(undefined);
    }
    this.fetchAllUser(
      this.search(),
      this.sort(),
      this.role(),
      this.status(),
      this.page(),
      this.limit()
    );
  }

  getSelectedUsers(): User[] {
    return this.selection.selected;
  }

  onDelete() {
    const userIds = this.getSelectedUsers().map((user) => user.id);
    this.userService.deleteUsers(userIds).subscribe({
      next: (res) => {
        this.datasource.data = this.datasource.data.filter(
          (users: User) => !userIds.includes(users.id)
        );
        this.toaster.success(res.message, 'success');
      },
      error: (err) => {
        this.toaster.error(err.error.message, 'error');
      },
    });
    this.selection.clear();
  }
  onLock() {
    const userIds = this.getSelectedUsers().map((user) => user.id);
    console.log(userIds);

    this.selection.clear();
  }
  onUnLock() {
    const userIds = this.getSelectedUsers().map((user) => user.id);
    console.log(userIds);

    this.selection.clear();
  }
}
