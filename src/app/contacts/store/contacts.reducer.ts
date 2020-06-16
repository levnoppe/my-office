import * as ContactsActions from './contacts.actions';
import {Contact} from '../RandomUserApi/randomUserApi.model';


export interface State {
 contacts: Contact[];
}

const initialState: State = {
  contacts: []
};

export function contactsReducer(state = initialState, action: ContactsActions.ContactsActions) {
  switch (action.type) {
    case ContactsActions.SAVE_CONTACT:
      return {
        ... state,
        contacts: [...state.contacts, action.payload]
      };
      case ContactsActions.DELETE_CONTACT:
      return state;
    case ContactsActions.LOAD_CONTACTS:
      return {
        ... state,
        contacts: [...action.payload]
      };
    case ContactsActions.FETCH_CONTACTS:
    default:
      return state;
  }
}
