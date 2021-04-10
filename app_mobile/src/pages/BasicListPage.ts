import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ApiProvider } from '../providers/api/api';


export abstract class BasicListPage implements OnInit, OnDestroy{

  protected subscription: Subscription;
  protected can_edit: boolean = false;

  constructor(public apiService: ApiProvider) {
  }

  ngOnInit(){
    this.subscription = this.apiService.dataUpdated.subscribe(() => this.onDataUpdated());
    this.onDataUpdated();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onDataUpdated(){
    if (this.apiService.hasData()){
      this.can_edit = this.apiService.canEdit();
      this.updateData();
    }
  }

  updateData(){}

}