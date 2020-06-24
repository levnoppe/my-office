import {Actions, Effect, ofType} from '@ngrx/effects';
import * as TasksActions from '../store/tasks.actions';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Task} from '../task.model';
import {TaskCategory} from '../taskCategory.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {of} from 'rxjs';
import * as ContactsActions from '../../contacts/store/contacts.actions';
import * as PostsActions from '../../posts/store/posts.actions';

const handleTasksError = (errorRes: any, store: Store) => {
  let errorMessage = 'An unknown error occurred.';
  if (!errorRes.error || !errorRes.error.error) {
    return of(store.dispatch(new TasksActions.TaskError(errorMessage)));
  }
  errorMessage = 'Task updating error: ' +
    errorRes.status +
    ' ' +
    errorRes.statusText +
    '(' +
    errorRes.error.error +
    ')';
  return of(store.dispatch(new TasksActions.TaskError(errorMessage)));
};

const handleFetchTasksError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred.';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new ContactsActions.ContactsError(errorMessage));
  }
  errorMessage = 'Tasks loading error: ' +
    errorRes.status +
    ' ' +
    errorRes.statusText +
    '(' +
    errorRes.error.error +
    ')';
  return of(new TasksActions.TaskError(errorMessage));
};

const handleCategoriesError = (errorRes: any, store: Store) => {
  let errorMessage = 'An unknown error occurred.';
  if (!errorRes.error || !errorRes.error.error) {
    return of(store.dispatch(new TasksActions.CategoryError(errorMessage)));
  }
  errorMessage = 'Category updating error: ' +
    errorRes.status +
    ' ' +
    errorRes.statusText +
    '(' +
    errorRes.error.error +
    ')';
  return of(store.dispatch(new TasksActions.CategoryError(errorMessage)));
};

const handleFetchCategoriesError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred.';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new ContactsActions.ContactsError(errorMessage));
  }
  errorMessage = 'Categories loading error: ' +
    errorRes.status +
    ' ' +
    errorRes.statusText +
    '(' +
    errorRes.error.error +
    ')';
  return of(new TasksActions.CategoryError(errorMessage));
};

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
    }),
    catchError(errorRes => {
      return handleFetchTasksError(errorRes);
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
    tap((res: {name}) => {
      this.store.dispatch(new TasksActions.GetTaskKey(res.name));
    }),
    catchError(errorRes => {
      return handleTasksError(errorRes, this.store);
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
    catchError(errorRes => {
      return handleTasksError(errorRes, this.store);
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
    catchError(errorRes => {
      return handleTasksError(errorRes, this.store);
    })
  );
// --------------------------------- task Categories effects --------------------------
// ------------------------------------------------------------------------------------
  @Effect()
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
    }),
    catchError(errorRes => {
      return handleFetchCategoriesError(errorRes);
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
    tap((res: {name}) => {
      this.store.dispatch(new TasksActions.GetCatKey(res.name));
    }),
    catchError(errorRes => {
      return handleCategoriesError(errorRes, this.store);
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
    catchError(errorRes => {
      return handleCategoriesError(errorRes, this.store);
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
    catchError(errorRes => {
      return handleCategoriesError(errorRes, this.store);
    })
  );

  constructor(private actions$: Actions<TasksActions.TasksActions>,
              private http: HttpClient,
              private store: Store<fromApp.AppState>){}
}
