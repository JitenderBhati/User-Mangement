import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
} from '@angular/router';

declare var window: any;

@Component({
  selector: 'um-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showMenu: boolean = true;
  showLogOut: boolean = true;
  isLoading: boolean = false;
  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/auth/login' || event['url'] == '/auth/register') {
          this.showLogOut = false;
          this.showMenu = false;
        }
      }
    });

    // Spinner for lazyload modules
    router.events.forEach((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    //Initialize UUI navigation
    window.UUI.Navigation.init();
    window.UUI.Header_Tools.init();
  }
}
