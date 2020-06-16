import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-office';
  private themeSub: Subscription;
  appId = 'theme1';

  constructor(private store: Store<fromApp.AppState>,
              @Inject(PLATFORM_ID) private platformId){}

  ngOnInit(): void {
    this.themeSub = this.store.select('shared').subscribe(sharedState => {
      this.appId = sharedState.theme;
    });

    // if (isPlatformBrowser(this.platformId)){
    this.store.dispatch(new AuthActions.AutoLogin());

    // }
  }

}
