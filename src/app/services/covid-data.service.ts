import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  async LoadData(url: string): Promise<any[]> {
    return new Promise((resolv, reject) => {
      this.httpClient.get(url)
        .subscribe(
          (data: any[]) => {
            data.map((x: any) => {
              if (x.codice_regione === 4 && x.denominazione_regione === 'P.A. Bolzano') {
                x.codice_regione = 40;
              }
            });
            resolv(data);
          }, (error) => {
            reject();
          }
      );
    });
  }
}
