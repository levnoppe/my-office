import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Contact} from './RandomUserApi/randomUserApi.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {RandomUserApiService} from './RandomUserApi/randomUserApi.service';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import * as ContactsActions from './store/contacts.actions';
import {State} from './store/contacts.reducer';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  isLoading = false;
  error: string = null;
  private closeSub: Subscription;
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
              private mediaObserver: MediaObserver,
              private componentFactoryResolver: ComponentFactoryResolver) {

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
      .subscribe(
        (contactsState: State) => {
          this.isLoading = contactsState.loading;
          this.error = contactsState.contactsError;
          if (this.error){
            this.showErrorAlert(this.error);
          }
          this.myContactsFeed = contactsState.contacts;
        }
      );

    this.randomUserApiService.fetchContacts().subscribe((contacts) => {
      this.contactsFeed = contacts;
    }, error => {
      this.error = error.message;
      this.showErrorAlert(error.message);
    });

  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  onAddContact(contact: Contact){
    this.store.dispatch(new ContactsActions.SaveContact(contact));
  }

  onDeleteContact(contact: Contact){
    this.store.dispatch(new ContactsActions.DeleteContact(contact.id));
  }

  ngOnDestroy() {
    if (this.closeSub){
      this.closeSub.unsubscribe();
    }

    this.themeSub.unsubscribe();
    this.myContactsSub.unsubscribe();
    this.watcher.unsubscribe();
  }
}
