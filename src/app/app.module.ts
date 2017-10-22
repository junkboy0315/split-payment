import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { PersonListService } from './shared/personlist.service';
import { MainComponent } from './main/main.component';
import { PersonComponent } from './main/person/person.component';

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
  ],
  providers: [
    PersonListService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
