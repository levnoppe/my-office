import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {Task} from './task.model';
import {TaskCategory} from './taskCategory.model';
import * as TasksActions from '../tasks/store/tasks.actions';
import {MatDialog} from '@angular/material/dialog';
import {DialogModalComponent} from './dialog-modal/dialog-modal.component';
import {UtilService} from '../shared/util-service/util.service';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';
import {State} from './store/tasks.reducer';
import {AlertComponent} from '../shared/alert/alert.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy{
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  isLoading = false;
  catIsLoading = false;
  error: string = null;
  private closeSub: Subscription;
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
              private utilService: UtilService,
              private componentFactoryResolver: ComponentFactoryResolver) { }

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
      // .pipe(map(tasksState => tasksState.tasks))
      .subscribe(
        (tasksState: State) => {
          this.isLoading = tasksState.tasksLoading;
          this.error = tasksState.tasksError;
          if (this.error){
            this.showErrorAlert(this.error);
          }
          if (tasksState.tasks){
            this.tasks = this.utilService.sortingObjectsArray(
              tasksState.tasks,
              'date',
              false);
          }
        }
      );

    this.store.dispatch(new TasksActions.FetchCategories());
    this.taskCategoriesSub = this.store.select('taskCategories')
      // .pipe(map(taskCategoriesState => taskCategoriesState.taskCategories))
      .subscribe(
        (tasksState: State) => {
          this.catIsLoading = tasksState.categoriesLoading;
          this.error = tasksState.categoriesError;
          if (this.error){
            this.showErrorAlert(this.error);
          }
          if (tasksState.taskCategories){
            this.taskCategories = tasksState.taskCategories;
          }
        }
      );
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
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
    if (this.closeSub){
      this.closeSub.unsubscribe();
    }

    this.themeSub.unsubscribe();
    this.tasksSub.unsubscribe();
    this.taskCategoriesSub.unsubscribe();
  }

}
