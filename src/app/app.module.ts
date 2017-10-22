import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { PersonListService } from './shared/personlist.service';
import { MainComponent } from './main/main.component';
import { PersonComponent } from './main/person/person.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  // redirect all other path to the root('') path
  { path: '**', redirectTo: '' }
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
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    PersonListService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
