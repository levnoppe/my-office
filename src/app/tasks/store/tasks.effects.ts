import {Actions, Effect, ofType} from '@ngrx/effects';
import * as TasksActions from '../store/tasks.actions';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Task} from '../task.model';
import {TaskCategory} from '../taskCategory.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';



@Injectable()
export class TasksEffects {
  @Effect()
  fetchTasks = this.actions$.pipe(
    ofType(TasksActions.FETCH_TASKS),
    switchMap(() => {
      return this.http
        .get<Task[]>(
          'https://my-office-1cd4e.firebaseio.com/tasks.json'
        );
    }),
    map(tasks => {
      const tasksArray: Task[] = [];
      for (const key in tasks) {
        if (tasks.hasOwnProperty(key)) {
          tasksArray.push({...tasks[key], id: key});
        }
      }

      return new TasksActions.LoadTasks(tasksArray);
    })
  );

  @Effect({dispatch: false})
  addTask = this.actions$.pipe(
    ofType(TasksActions.ADD_TASK),
    withLatestFrom(this.store.select('auth')),
    switchMap(([action, authState]) => {
      return this.http.post(
        'https://my-office-1cd4e.firebaseio.com/tasks.json?auth=' +
        authState.user.token,
        action.payload);
    }),
    tap(() => {
      this.store.dispatch(new TasksActions.FetchTasks());
    })
  );

  @Effect({dispatch: false})
  updateTask = this.actions$.pipe(
    ofType(TasksActions.UPDATE_TASK),
    withLatestFrom(this.store.select('auth')),
    switchMap(([action, authState]) => {
      return this.http.patch(
        'https://my-office-1cd4e.firebaseio.com/tasks/' +
        action.payload.index +
        '.json',
        action.payload.newTask
      );
    }),
    tap(() => {
      this.store.dispatch(new TasksActions.FetchTasks());
    })
  );

  @Effect({dispatch: false})
  deleteTask = this.actions$.pipe(
    ofType(TasksActions.DELETE_TASK),
    withLatestFrom(this.store.select('auth')),
    switchMap(([action, authState]) => {
      return this.http.delete(
        'https://my-office-1cd4e.firebaseio.com/tasks/' +
        action.payload +
        '.json'
      );
    }),
    tap(() => {
      this.store.dispatch(new TasksActions.FetchTasks());
    })
  );

  @Effect() // --------------------------------- task Categories effects
  fetchTaskCategories = this.actions$.pipe(
    ofType(TasksActions.FETCH_CATEGORIES),
    switchMap(() => {
      return this.http
        .get<TaskCategory[]>(
          'https://my-office-1cd4e.firebaseio.com/taskCategories.json'
        );
    }),
    map(taskCategories => {
      const taskCategoriesArray: TaskCategory[] = [];
      for (const key in taskCategories) {
        if (taskCategories.hasOwnProperty(key)) {
          taskCategoriesArray.push({...taskCategories[key], id: key});
        }
      }

      return new TasksActions.LoadCategories(taskCategoriesArray);
    })
  );

  @Effect({dispatch: false})
  addTaskCategory = this.actions$.pipe(
    ofType(TasksActions.ADD_CATEGORY),
    withLatestFrom(this.store.select('auth')),
    switchMap(([action, authState]) => {
      return this.http.post(
        'https://my-office-1cd4e.firebaseio.com/taskCategories.json?auth=' +
        authState.user.token,
        action.payload);
    }),
    tap(() => {
      this.store.dispatch(new TasksActions.FetchCategories());
    })
  );

  @Effect({dispatch: false})
  updateTaskCategory = this.actions$.pipe(
    ofType(TasksActions.UPDATE_CATEGORY),
    withLatestFrom(this.store.select('auth')),
    switchMap(([action, authState]) => {
      return this.http.patch(
        'https://my-office-1cd4e.firebaseio.com/taskCategories/' +
        action.payload.index +
        '.json',
        action.payload.newTaskCategory
      );
    }),
    tap(() => {
      this.store.dispatch(new TasksActions.FetchCategories());
    })
  );

  @Effect({dispatch: false})
  deleteTaskCategories = this.actions$.pipe(
    ofType(TasksActions.DELETE_CATEGORY),
    withLatestFrom(this.store.select('auth')),
    switchMap(([action, authState]) => {
      return this.http.delete(
        'https://my-office-1cd4e.firebaseio.com/taskCategories/' +
        action.payload +
        '.json'
      );
    }),
    tap(() => {
      this.store.dispatch(new TasksActions.FetchCategories());
    })
  );

  constructor(private actions$: Actions<TasksActions.TasksActions>,
              private http: HttpClient,
              private store: Store<fromApp.AppState>){}
}
