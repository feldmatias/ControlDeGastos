import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppMinimize } from '@ionic-native/app-minimize';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  backButtonSubscription: any;

  constructor(public platform: Platform, public navCtrl: NavController, public minimize: AppMinimize) {

  }

  ionViewDidEnter(){
    this.backButtonSubscription = this.platform.registerBackButtonAction(() => {
      this.minimize.minimize();
    }, 10);
  }

  ionViewWillLeave(){
    this.backButtonSubscription();
  }

}
