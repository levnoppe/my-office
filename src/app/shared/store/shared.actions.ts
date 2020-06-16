import {Action} from '@ngrx/store';

export const SET_THEME = '[Shared] Set Theme';
export const GET_THEME = '[Shared] Get Theme';
export const SAVE_ACTIVE_PAGE = '[Shared] Save Active Page';

export class SaveActivePage implements Action {
  readonly type = SAVE_ACTIVE_PAGE;

  constructor(public payload: string){}
}

export class SetTheme implements Action {
  readonly type = SET_THEME;

  constructor(public payload: string){}
}

export class GetTheme implements Action {
  readonly type = GET_THEME;

}

export type  SharedActions =
  SetTheme
  | GetTheme
  | SaveActivePage;
