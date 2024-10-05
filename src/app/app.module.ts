import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ModalComponent } from './components/modal/modal.component';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [AppComponent, CheckoutComponent, ModalComponent],
  imports: [BrowserModule, RouterOutlet],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
