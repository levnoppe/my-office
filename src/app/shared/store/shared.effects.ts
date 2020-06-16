import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as SharedActions from '../../shared/store/shared.actions';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class SharedEffects {

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) {}

  //   @Effect()
  //   setTheme = this.actions$.pipe(
  //   ofType(SharedActions.SET_THEME),
  //     map((setThemeAction: SharedActions.SetTheme) => {
  //       return setThemeAction.map(recipe => {
  //         return {
  //           ...recipe,
  //           ingredients: recipe.ingredients ? recipe.ingredients : []
  //         };
  //       });
  //     }),
  //     map(recipes => {
  //       return new RecipesActions.SetRecipes(recipes);
  //     })
  // );

  //   @Effect()
  //   getTheme = this.actions$.pipe(
  //   ofType(SharedActions.GET_THEME),
  //   withLatestFrom(this.store.select('shared')),
  //   switchMap(([actionData, themeState]) => {
  //     return themeState.theme;
  //   })
  // );
}
