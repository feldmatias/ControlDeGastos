import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, IonicApp, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility';

import { HomePage } from '../pages/home/home';
import { VariableOutcomesPage } from '../pages/variable-outcomes/variable-outcomes';
import { VariableIncomesPage } from '../pages/variable-incomes/variable-incomes';
import { FixedOutcomesPage } from '../pages/fixed-outcomes/fixed-outcomes';
import { ClinicIncomesPage } from '../pages/clinic-incomes/clinic-incomes';
import { ClinicOutcomesPage } from '../pages/clinic-outcomes/clinic-outcomes';
import { DepartmentIncomesPage } from '../pages/department-incomes/department-incomes';
import { DollarPurchasesPage } from '../pages/dollar-purchases/dollar-purchases';
import { BalancePage } from '../pages/balance/balance';
import { ConfigurationPage } from '../pages/configuration/configuration';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
        public apiProvider: ApiProvider, public accessibility: MobileAccessibility, public app: IonicApp,
        public menuCtrl: MenuController) {

    this.initializeApp();

    this.pages = [
      { title: 'Gastos Variables', component: VariableOutcomesPage, icon: 'cart' },
      { title: 'Ingresos de Clínicas', component: ClinicIncomesPage, icon: 'desktop' },
      { title: 'Gastos Fijos', component: FixedOutcomesPage, icon: 'ios-card' },
      { title: 'Gastos de Clínicas', component: ClinicOutcomesPage, icon: 'cash' },
      { title: 'Ingresos de Alquileres', component: DepartmentIncomesPage, icon: 'ios-home' },
      { title: 'Otros Ingresos', component: VariableIncomesPage, icon: 'calculator' },
      { title: 'Dólares', component: DollarPurchasesPage, icon: 'logo-usd' },
      { title: 'Balance', component: BalancePage, icon: 'stats' },
      { title: 'Configuración', component: ConfigurationPage, icon: 'settings' },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      this.platform.registerBackButtonAction(() => {
        if (this.closeModals()) {
          // it will close the modals, alerts
        } else if (this.closeMenu()){
          // it will close the menu
        } else if (this.nav.canGoBack()){
          this.nav.pop();
        } else {
          this.nav.setRoot(this.rootPage);
        }
      }, 5);

      this.platform.resume.subscribe(() => {
        this.apiProvider.updateMonth();
        this.nav.popToRoot();
        this.closeModals();
        this.closeMenu();
      }); 

      this.accessibility.usePreferredTextZoom(false);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  closeMenu(){
    if (this.menuCtrl.isOpen()){
      this.menuCtrl.close();
      return true;
    }
    return false;
  }

  closeModals(){
    const activePortal = this.app._loadingPortal.getActive() ||
      this.app._modalPortal.getActive() ||
      this.app._toastPortal.getActive() ||
      this.app._overlayPortal.getActive();
    if (activePortal) {
      activePortal.dismiss();
      return true;
    }
    return false;
  }
}
