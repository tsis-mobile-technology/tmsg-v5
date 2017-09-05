import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';

// App component
import { AppComponent } from './app.component';

import { HeaderComponent } from './header';
import { BodyComponent } from './body';
import { TailerComponent } from './tailer';


@NgModule({
  imports: [
    BrowserModule // by Default imports
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    TailerComponent
  ],
  exports: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
