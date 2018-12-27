import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { HttpClientModule } from  '@angular/common/http';
import { IonicSelectableModule } from 'ionic-selectable';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { VariableOutcomesPage } from '../pages/variable-outcomes/variable-outcomes';
import { NewVariableOutcomePage } from '../pages/new-variable-outcome/new-variable-outcome';
import { FixedOutcomesPage } from '../pages/fixed-outcomes/fixed-outcomes';
import { NewFixedOutcomePage } from '../pages/new-fixed-outcome/new-fixed-outcome';
import { ClinicIncomesPage } from '../pages/clinic-incomes/clinic-incomes';
import { NewClinicIncomePage } from '../pages/new-clinic-income/new-clinic-income';
import { ClinicOutcomesPage } from '../pages/clinic-outcomes/clinic-outcomes';
import { NewClinicOutcomePage } from '../pages/new-clinic-outcome/new-clinic-outcome';
import { DepartmentIncomesPage } from '../pages/department-incomes/department-incomes';
import { NewDepartmentIncomePage } from '../pages/new-department-income/new-department-income';
import { DollarPurchasesPage } from '../pages/dollar-purchases/dollar-purchases';
import { NewDollarPurchasePage } from '../pages/new-dollar-purchase/new-dollar-purchase';
import { BalancePage } from '../pages/balance/balance';
import { EditInitialBalancePage } from '../pages/edit-initial-balance/edit-initial-balance';
import { EditMonthResultPage } from '../pages/edit-month-result/edit-month-result';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { NewListableTypePage } from '../pages/new-listable-type/new-listable-type';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppMinimize } from '@ionic-native/app-minimize';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility';
import { ServerProvider } from '../providers/server/server';
import { ApiProvider } from '../providers/api/api';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    VariableOutcomesPage,
    NewVariableOutcomePage,
    FixedOutcomesPage,
    NewFixedOutcomePage,
    ClinicIncomesPage,
    NewClinicIncomePage,
    ClinicOutcomesPage,
    NewClinicOutcomePage,
    DepartmentIncomesPage,
    NewDepartmentIncomePage,
    DollarPurchasesPage,
    NewDollarPurchasePage,
    BalancePage,
    EditInitialBalancePage,
    EditMonthResultPage,
    ConfigurationPage,
    NewListableTypePage,
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicSelectableModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    VariableOutcomesPage,
    NewVariableOutcomePage,
    FixedOutcomesPage,
    NewFixedOutcomePage,
    ClinicIncomesPage,
    NewClinicIncomePage,
    ClinicOutcomesPage,
    NewClinicOutcomePage,
    DepartmentIncomesPage,
    NewDepartmentIncomePage,
    DollarPurchasesPage,
    NewDollarPurchasePage,
    BalancePage,
    EditInitialBalancePage,
    EditMonthResultPage,
    ConfigurationPage,
    NewListableTypePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppMinimize,
    MobileAccessibility,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServerProvider,
    ApiProvider,
  ]
})
export class AppModule {}
