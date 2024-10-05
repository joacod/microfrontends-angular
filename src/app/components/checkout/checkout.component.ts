import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  checkoutModule,
  techToggleModule,
} from '@joacod/microfrontends-utility';
import { environment } from '../../../environments/environment';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  checkoutItems: any[] = []; // Define the array to hold checkout items
  subscription: Subscription = new Subscription();
  toggleSubscription: Subscription = new Subscription();
  showModal = false;
  angularLogo = environment.baseUrl + '/assets/images/angular.png';
  showTech = false;
  angularVersion = '17.0.0';

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.subscription = checkoutModule.items$.subscribe((items: any) => {
      this.checkoutItems = items; // Update the checkout items array
    });
    this.toggleSubscription = techToggleModule.techOn$.subscribe(() => {
      this.showTech = techToggleModule.getTechOn();
      // workaround to trigger angular change detection when observable is updated
      this.changeDetector.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.toggleSubscription.unsubscribe();
  }

  get total(): number {
    return this.checkoutItems.reduce((acc, item) => acc + item.price, 0);
  }

  reset(): void {
    this.openModal();
    checkoutModule.reset();
  }

  removeItem(id: number): void {
    checkoutModule.removeItem(id);
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
