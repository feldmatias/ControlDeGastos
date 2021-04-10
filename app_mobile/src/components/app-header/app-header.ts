import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { ApiProvider } from '../../providers/api/api';
import { BasicMonth } from '../../models/Month';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html'
})
export class AppHeaderComponent implements OnInit, OnDestroy{

  private subscription: Subscription;

  @Input() title: string;
  @Input() disabled: boolean = false;
  @Input() showMonths: boolean = true;

  months: Array<BasicMonth> = [];
  currentMonth: BasicMonth;
  selectedMonthId: number;

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider) {
  }

  ngOnInit(){
    this.subscription = this.apiProvider.dataUpdated.subscribe(() => this.onDataUpdated());
    this.onDataUpdated();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onDataUpdated(){
    if (this.apiProvider.hasData()){
      this.months = this.apiProvider.getMonthsList();
      this.currentMonth = this.apiProvider.getCurrentMonth();
      this.selectedMonthId = this.currentMonth.id;
    }
  }

  onChange(){
    this.apiProvider.updateMonth(this.selectedMonthId);
  }

}
