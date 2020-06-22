import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {UtilService} from './shared/util-service/util.service';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    UtilService
  ]
})
export class CoreModule {

}
