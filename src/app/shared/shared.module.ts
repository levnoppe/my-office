import {NgModule} from '@angular/core';
import {AlertComponent} from './alert/alert.component';
import {PlaceholderDirective} from './placeholder/placeholder.directive';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedComponent } from './shared.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {ColorPickerModule} from 'ngx-color-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from '@angular-material-components/datetime-picker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AlertComponent,
    PlaceholderDirective,
    SharedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatGridListModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    ColorPickerModule
  ],
  exports: [
    SharedComponent,
    AlertComponent,
    PlaceholderDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatGridListModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    ColorPickerModule
  ]
})

export class SharedModule {

}
