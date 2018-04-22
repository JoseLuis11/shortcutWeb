import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//components
import {OwnerHomepageComponent, RegisterEmployeeComponent, RegisterWorkplaceComponent, LoginOwnerComponent, RegisterOwnerComponent} from './index.pages'
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
