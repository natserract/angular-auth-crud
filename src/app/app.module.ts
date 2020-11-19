import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ModModule } from './modules/mod.module';
import { ApiService } from './core/services/api.service';
import { StorageService } from './core/services/storage.service';
import { AuthService } from './core/services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthGuard } from './core/guards/auth.guard';
import { HttpErrorInterceptor } from './core/interceptors/http.interceptor';
import { AppStoreModule } from './store/store.module';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'crud' }),
    AppRoutingModule,
    AppStoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    ModModule,
    EntityDataModule.forRoot(entityConfig)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    AuthGuard,
    AuthService,
    ApiService,
    StorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
