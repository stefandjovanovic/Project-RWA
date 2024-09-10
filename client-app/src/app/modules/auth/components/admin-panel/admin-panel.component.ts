import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserInfo} from "../../interfaces/user-info.interface";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as AdminPanelActions from "../../store/admin-panel/admin-panel.actions";
import {Observable, Subscription} from "rxjs";
import {selectUsers} from "../../store/admin-panel/admin-panel.selectors";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit, OnDestroy, AfterViewInit {
  users: Observable<UserInfo[]> = new Observable<UserInfo[]>();
  displayedColumns: string[] = ['username', 'role', 'toAdmin', 'toManager', 'toPlayer', 'delete'];
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatTable, {static: true}) table!: MatTable<any>;

  dataSource = new MatTableDataSource<UserInfo>([]);
  usersSubscription: Subscription = new Subscription();

  filterValue: string = '';

  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.users = this.store.select(selectUsers);
    this.usersSubscription = this.users.subscribe((users) => {
      this.dataSource.data = users;
    });
    this.store.dispatch(AdminPanelActions.fetchUsers());
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onUpgradeToAdmin(id: string) {
   this.store.dispatch(AdminPanelActions.toAdmin({id}));
  }
  onUpgradeToManager(id: string) {
    this.store.dispatch(AdminPanelActions.toManager({id}));
  }

  onUpgradeToPlayer(id: string) {
    this.store.dispatch(AdminPanelActions.toPlayer({id}));
  }

  onDelete(id: string) {
    if(confirm('Are you sure you want to delete this user?')){
      this.store.dispatch(AdminPanelActions.deleteUser({id}));
    }
  }

  applyFilter() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

}
