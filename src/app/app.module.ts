import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import * as Raven from 'raven-js';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { PersonComponent } from './main/person/person.component';
import { PersonListService } from './shared/personlist.service';

Raven.config(
  'https://5663add69d7645a39ea0e3acaa818a60@sentry.io/1206596',
).install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err);
  }
}

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  // redirect all other path to the root('') path
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    PersonComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    PersonListService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
