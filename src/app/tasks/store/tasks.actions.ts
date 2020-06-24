import {Action} from '@ngrx/store';
import {Task} from '../task.model';
import {TaskCategory} from '../taskCategory.model';
import {GET_KEY} from '../../posts/store/posts.actions';

export const ADD_TASK = '[Tasks] Save Task';
export const GET_TASK_KEY = '[Tasks] Get Task Key';
export const LOAD_TASKS = '[Tasks] Load Tasks';
export const FETCH_TASKS = '[Tasks] Fetch Tasks';
export const DELETE_TASK = '[Tasks] Delete Task';
export const UPDATE_TASK = '[Tasks] Update Task';
export const TASK_ERROR = '[Tasks] Task Error';

export const ADD_CATEGORY = '[Tasks] Save Category';
export const GET_CAT_KEY = '[Tasks] Get Category Key';
export const LOAD_CATEGORIES = '[Tasks] Load Categories';
export const FETCH_CATEGORIES = '[Tasks] Fetch Categories';
export const DELETE_CATEGORY = '[Tasks] Delete Category';
export const UPDATE_CATEGORY = '[Tasks] Update Category';
export const CATEGORY_ERROR = '[Tasks] Category Error';

export class AddTask implements Action{
  readonly type = ADD_TASK;

  constructor(public payload: Task){}
}

export class GetTaskKey implements Action{
  readonly type = GET_TASK_KEY;

  constructor(public payload: string){}
}

export class LoadTasks implements Action{
  readonly type = LOAD_TASKS;

  constructor(public payload: Task[]){}
}

export class FetchTasks implements Action{
  readonly type = FETCH_TASKS;
}

export class UpdateTask implements Action{
  readonly type = UPDATE_TASK;

  constructor(public payload: {index: string, newTask: Task}){}
}

export class DeleteTask implements Action{
  readonly type = DELETE_TASK;

  constructor(public payload: string){}
}

export class TaskError implements Action {
  readonly type = TASK_ERROR;

  constructor(public payload: string ) {
  }
}


// ------------------ taskCategory

export class AddCategory implements Action{
  readonly type = ADD_CATEGORY;

  constructor(public payload: TaskCategory){}
}

export class GetCatKey implements Action{
  readonly type = GET_CAT_KEY;

  constructor(public payload: string){}
}

export class LoadCategories implements Action{
  readonly type = LOAD_CATEGORIES;

  constructor(public payload: TaskCategory[]){}
}

export class FetchCategories implements Action{
  readonly type = FETCH_CATEGORIES;
}

export class UpdateCategory implements Action{
  readonly type = UPDATE_CATEGORY;

  constructor(public payload: {index: string, newTaskCategory: TaskCategory}){}
}

export class DeleteCategory implements Action{
  readonly type = DELETE_CATEGORY;

  constructor(public payload: string){}
}

export class CategoryError implements Action {
  readonly type = CATEGORY_ERROR;

  constructor(public payload: string ) {
  }
}

export type TasksActions =
  LoadTasks
  | FetchTasks
  | AddTask
  | GetTaskKey
  | UpdateTask
  | DeleteTask
  | TaskError
  | LoadCategories  // ----------------------
  | FetchCategories
  | AddCategory
  | GetCatKey
  | UpdateCategory
  | DeleteCategory
  | CategoryError;
