import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {Contact} from './RandomUserApi/randomUserApi.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {RandomUserApiService} from './RandomUserApi/randomUserApi.service';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import * as ContactsActions from './store/contacts.actions';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {
  error = new Subject<string>();
  private themeSub: Subscription;
  appId = 'theme2';
  contactsFeed: Contact[] = [];
  myContactsSub: Subscription;
  myContactsFeed: Contact[] = [];
  nbCols = 3;
  watcher: Subscription;
  activeMediaQuery = '';

  constructor(private store: Store<fromApp.AppState>,
              private randomUserApiService: RandomUserApiService,
              private mediaObserver: MediaObserver ) {

  }

  ngOnInit(): void {
    this.themeSub = this.store.select('shared').subscribe(sharedState => {
      this.appId = sharedState.theme;
    });

    this.watcher = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';

      switch (change.mqAlias) {
        case 'xs': this.nbCols = 1; break;
        case 'sm': this.nbCols = 2; break;
        case 'md': this.nbCols = 3; break;
        case 'lg': this.nbCols = 4; break;
        case 'xl': this.nbCols = 5; break;
        default: this.nbCols = 3;
      }
    });

    this.store.dispatch(new ContactsActions.FetchContacts());
    this.myContactsSub = this.store.select('contacts')
      .pipe(map(contactsState => contactsState.contacts))
      .subscribe(
        (contacts: Contact[]) => {
          this.myContactsFeed = contacts;
        }
      );

    this.randomUserApiService.fetchContacts().subscribe((contacts) => {
      this.contactsFeed = contacts;
    }, error => {
      this.error = error.message;
    });

  }

  onAddContact(contact: Contact){
    this.store.dispatch(new ContactsActions.SaveContact(contact));
  }

  onDeleteContact(contact: Contact){
    this.store.dispatch(new ContactsActions.DeleteContact(contact));
  }

  ngOnDestroy() {
    this.themeSub.unsubscribe();
    this.myContactsSub.unsubscribe();
    this.watcher.unsubscribe();
  }
}
