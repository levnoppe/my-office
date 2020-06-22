import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {Task} from './task.model';
import {TaskCategory} from './taskCategory.model';
import * as TasksActions from '../tasks/store/tasks.actions';
import {map} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {DialogModalComponent} from './dialog-modal/dialog-modal.component';
import {UtilService} from '../shared/util-service/util.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy{
  error = new Subject<string>();
  private themeSub: Subscription;
  private tasksSub: Subscription;
  private taskCategoriesSub: Subscription;
  appId = 'theme2';
  tasks: Task[] = [];
  taskCategories: TaskCategory[] = [];
  newTask: Task;
  title = 'test';
  color;

  constructor(private store: Store<fromApp.AppState>,
              public dialog: MatDialog,
              private utilService: UtilService) { }

  compare = ( a, b ) => {
    const sortingParam = 'date';
    const sortingDirection = false;
    const param = sortingParam;
    if ( a[param] > b[param] ){
      return sortingDirection ? -1 : 1;
    }
    if ( a[param] < b[param] ){
      return sortingDirection ? 1 : -1;
    }
    return 0;
  }

  ngOnInit(): void {
    this.themeSub = this.store.select('shared').subscribe(sharedState => {
      this.appId = sharedState.theme;
    });

    this.store.dispatch(new TasksActions.FetchTasks());
    this.tasksSub = this.store.select('tasks')
      .pipe(map(tasksState => tasksState.tasks))
      .subscribe(
        (tasks: Task[]) => {
          this.tasks = this.utilService.sortingObjectsArray(
            tasks,
            'date',
            false);
        }
      );

    this.store.dispatch(new TasksActions.FetchCategories());
    this.taskCategoriesSub = this.store.select('taskCategories')
      .pipe(map(taskCategoriesState => taskCategoriesState.taskCategories))
      .subscribe(
        (taskCategories: TaskCategory[]) => {
          this.taskCategories = taskCategories;
        }
      );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogModalComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newTask = result;
    });
  }

  ngOnDestroy() {
    this.themeSub.unsubscribe();
    this.tasksSub.unsubscribe();
    this.taskCategoriesSub.unsubscribe();
  }

}
