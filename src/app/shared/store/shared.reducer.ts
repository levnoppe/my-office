import * as SharedActions from './shared.actions';

export interface State {
  theme: string;
  activePage: string;
}

const initialState: State = {
  theme: 'theme1',
  activePage: 'auth'
};

export function sharedReducer(state = initialState, action: SharedActions.SharedActions) {
  switch (action.type) {
    case SharedActions.SAVE_ACTIVE_PAGE:
    return {
    ...state,
      activePage: action.payload
    };
    case SharedActions.SET_THEME:
    return {
    ...state,
      theme: action.payload,
    };
    case SharedActions.GET_THEME:
      return state;
    default:
      return state;
  }
}


