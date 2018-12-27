import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { LoadingController, AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { catchError, retry, finalize } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { Utils } from '../../models/Utils';

@Injectable()
export class ServerProvider {

  serverUrl = 'miweb.com';
  serverApiKey = '12345';
  loading;

  headers = {
    params: new HttpParams().set('apiKey', this.serverApiKey),
  };

  constructor(public http: HttpClient, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  
  }

  get(url: string){
    this.showLoading();
    return this.http.get(this.serverUrl + url, this.headers)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError.bind(this)), // then handle the error
        finalize(() => this.loading.dismiss())
      );
  }

  post(url: string, data: any){
    let form_data = Utils.objectToFormData(data);

    this.showLoading();
    return this.http.post(this.serverUrl + url, form_data, this.headers)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError.bind(this)), // then handle the error
        finalize(() => this.loading.dismiss())
      );
  }

  private showLoading(){
    this.loading = this.loadingCtrl.create({
              content: 'Actualizando datos...'
            });

    this.loading.present();
  }

  private handleError(error: HttpErrorResponse){
    let alert = this.alertCtrl.create({
      title: 'Error de conexión',
      subTitle: 'Ocurrió un error en la conexión con el servidor',
      buttons: ['Aceptar']
    });
    alert.present();
    return Observable.throw('error');
  }

}
