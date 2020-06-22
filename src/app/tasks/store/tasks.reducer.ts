import {Task} from '../task.model';
import {TaskCategory} from '../taskCategory.model';
import * as TasksActions from './tasks.actions';

export interface State {
  tasks: Task[];
  taskCategories: TaskCategory[];
}

const initialState: State = {
  tasks: [],
  taskCategories: []
};

export function tasksReducer(state = initialState, action: TasksActions.TasksActions) {
  switch (action.type) {
    case TasksActions.LOAD_TASKS:
      return {
        ...state,
        tasks: [...action.payload]
      };
    case TasksActions.FETCH_TASKS:
      return state;
    case TasksActions.ADD_TASK:
      return {
        ... state,
        tasks: [...state.tasks, action.payload]
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
      case TasksActions.LOAD_CATEGORIES:  // --------------------- task Categories
      return {
        ...state,
        taskCategories: [...action.payload]
      };
    case TasksActions.FETCH_CATEGORIES:
      return state;
    case TasksActions.ADD_CATEGORY:
      return {
        ... state,
        taskCategories: [...state.taskCategories, action.payload]
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

    default:
      return state;
  }
}
