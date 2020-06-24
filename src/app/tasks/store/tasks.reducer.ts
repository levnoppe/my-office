import {Task} from '../task.model';
import {TaskCategory} from '../taskCategory.model';
import * as TasksActions from './tasks.actions';
import * as PostsActions from '../../posts/store/posts.actions';

export interface State {
  tasks: Task[];
  taskCategories: TaskCategory[];
  tasksLoading: boolean;
  tasksError: string;
  categoriesLoading: boolean;
  categoriesError: string;
}

const initialState: State = {
  tasks: [],
  taskCategories: [],
  tasksLoading: false,
  tasksError: null,
  categoriesLoading: false,
  categoriesError: null,
};

export function tasksReducer(state = initialState, action: TasksActions.TasksActions) {
  let id;
  let addedTask;
  let addedCategory;
  let newIndex;

  switch (action.type) {
    case TasksActions.LOAD_TASKS:
      return {
        ...state,
        tasks: [...action.payload],
        tasksLoading: false
      };
    case TasksActions.FETCH_TASKS:
      return {
        ... state,
        tasksLoading: true
      };
    case TasksActions.ADD_TASK:
      id = 'newTask';
      addedTask = {...action.payload, id};
      return {
        ... state,
        tasks: [...state.tasks, addedTask]
      };
    case TasksActions.GET_TASK_KEY:
      newIndex = state.tasks.map(e => e.id).indexOf('newTask');
      id = action.payload;
      addedTask = {...state.tasks[newIndex], id};
      const updTask = {
        ...state.tasks[newIndex],
        ...addedTask
      };
      const updTasks = [...state.tasks];
      updTasks[newIndex] = updTask;
      return {
        ...state,
        tasks: updTasks
      };
    case TasksActions.UPDATE_TASK:
      const updatedTask = {
        ...state.tasks[action.payload.index],
        ...action.payload.newTask
      };
      const updatedTasks = [...state.tasks];
      updatedTasks[action.payload.index] = updatedTask;
      return {
        ...state,
        tasks: updatedTasks
      };
    case TasksActions.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => {
          return task.id !== action.payload;
        })
      };
    case TasksActions.TASK_ERROR:
      return {
        ...state,
        tasks: null,
        tasksError: action.payload,
        tasksLoading: false
      };
      case TasksActions.LOAD_CATEGORIES:  // --------------------- task Categories
      return {
        ...state,
        taskCategories: [...action.payload],
        categoriesLoading: false
      };
    case TasksActions.FETCH_CATEGORIES:
      return {
        ... state,
        categoriesLoading: true
      };
    case TasksActions.ADD_CATEGORY:
      id = 'newCategory';
      addedCategory = {...action.payload, id};
      return {
        ... state,
        taskCategories: [...state.taskCategories, addedCategory]
      };
    case TasksActions.GET_CAT_KEY:
      newIndex = state.taskCategories.map(e => e.id).indexOf('newCategory');
      id = action.payload;
      addedCategory = {...state.taskCategories[newIndex], id};
      const updCategory = {
        ...state.taskCategories[newIndex],
        ...addedCategory
      };
      const updCategories = [...state.taskCategories];
      updCategories[newIndex] = updCategory;
      return {
        ...state,
        taskCategories: updCategories
      };
    case TasksActions.UPDATE_CATEGORY:
      const updatedCategory = {
        ...state.taskCategories[action.payload.index],
        ...action.payload.newTaskCategory
      };
      const updatedCategories = [...state.taskCategories];
      updatedCategories[action.payload.index] = updatedCategory;
      return {
        ...state,
        taskCategories: updatedCategories
      };
    case TasksActions.DELETE_CATEGORY:
      return {
        ...state,
        taskCategories: state.taskCategories.filter((category) => {
          return category.id !== action.payload;
        })
      };
    case TasksActions.CATEGORY_ERROR:
      return {
        ...state,
        taskCategories: null,
        categoriesError: action.payload,
        categoriesLoading: false
      };
    default:
      return state;
  }
}
