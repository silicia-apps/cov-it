import { Component, OnInit } from '@angular/core';
import { PickerOptions } from '@ionic/core';
import { PickerController, AlertController } from '@ionic/angular';
import { Store, Select } from '@ngxs/store';
import { LoadData, SetFilterData, SetFilterArea } from 'src/app/store/covid.actions';
import { CovidDataState } from 'src/app/store/covid.state';
import { ICovidData } from 'src/app/store/covid.model';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public minDate = '2020-02-24';
  public maxDate = new Date().toISOString();
  public prevDay: string;
  public lastUpdate: string;
  public area: number;
  private areaIndex: number;
  public historyDeceduti = [];
  public historyGuariti = [];
  public historyTerapia = [];
  public historyRicoverati = [];
  public historyDomicilio = [];
  public historyPositivi = [];
  public DarkColor: string;

  @Select(CovidDataState.getLastUpdate)
  public lastUpdate$: Observable<any>;

  @Select(CovidDataState.getHistory)
  public history$: Observable<any>;

  @Select(CovidDataState.getData)
  public day$: Observable<string>;

  @Select(CovidDataState.getPrevDay)
  public prevDay$: Observable<string>;

  @Select(CovidDataState.getCovidData(false))
  public last$: Observable<ICovidData>;

  @Select(CovidDataState.getCovidData(true))
  public prev$: Observable<ICovidData>;

  @Select(CovidDataState.getArea)
  public area$: Observable<number>;

  @Select(CovidDataState.getLastArea)
  public lastArea$: Observable<string>;

  constructor(
    private translateService: TranslateService,
    private store: Store,
    private pickerController: PickerController,
    private alertController: AlertController) { }

  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches) {
      this.DarkColor = '#f4f5f8';
    } else {
      this.DarkColor = '#222428';
    }
    this.updateFilterData(this.maxDate);
    this.loadData();
    this.lastUpdate$.subscribe((value) => {
      this.lastUpdate = value;
    });
    this.prevDay$.subscribe((value) => {
      this.prevDay = value;
    });
    this.area$.subscribe((value) => { this.area = value; });
    this.history$.subscribe(async (value) => {
      this.historyDeceduti = [{
        name: await this.translateService.get('HOME_DECEASED').toPromise(),
        series: value.deceduti
      }];
      this.historyGuariti = [{
        name: await this.translateService.get('HOME_HEALED').toPromise(),
        series: value.guariti
      }];
      this.historyTerapia = [{
        name: await this.translateService.get('HOME_HOSPITALIZED_IN_INTENSIVE_CARE').toPromise(),
        series: value.terapia
      }];
      this.historyRicoverati = [{
        name: await this.translateService.get('HOME_HOSPITALIZED_WITH_SYMPTOMS').toPromise(),
        series: value.ricoverati
      }];
      this.historyDomicilio = [{
        name: await this.translateService.get('HOME_IN_HOME_ISOLATION').toPromise(),
        series: value.domicilio
      }];
      this.historyPositivi = [{
        name: await this.translateService.get('HOME_TOTAL_CASES').toPromise(),
        series: value.totale
      }, {
        name: await this.translateService.get('HOME_TOTAL_POSITIVES').toPromise(),
        series: value.positivi
      }];
    });
  }

  async showPicker() {
    const options: PickerOptions = {
      buttons: [
        {
          text: await this.translateService.get('HOME_CANCEL').toPromise(),
          role: 'cancel'
        },
        {
          text: await this.translateService.get('HOME_DONE').toPromise(),
          handler: (value: any) => {
            this.store.dispatch(new SetFilterArea({ denominazione: value.Area.text, area: value.Area.value }));
          }
        }
      ],
      columns: [{
        name: 'Area',
        options: await this.getColumnOptions()
      }]
    };

    const picker = await this.pickerController.create(options);
    picker.columns[0].selectedIndex = this.areaIndex;
    picker.present();
  }

  async getColumnOptions() {
    const regioni = [
      [await this.translateService.get('HOME_ALL').toPromise(), 0],
      ['Abruzzo', 13],
      ['Basilicata', 17],
      ['P.A. Bolzano', 40],
      ['Calabria', 18],
      ['Campania', 15],
      ['Emilia-Romagna', 8],
      ['Friuli Venezia Giulia', 6],
      ['Lazio', 12],
      ['Liguria', 7],
      ['Lombardia', 3],
      ['Marche', 11],
      ['Molise', 14],
      ['Piemonte', 1],
      ['Puglia', 16],
      ['Campania', 15],
      ['Sardegna', 20],
      ['Sicilia', 19],
      ['Toscana', 9],
      ['P.A. Trento', 4],
      ['Umbria', 10],
      ['Valle d\'Aosta', 2],
      ['Veneto', 5],
    ];
    const options = [];
    let tmpAreaIndex = 0;
    regioni.forEach(x => {
      options.push({ text: x[0], value: x[1], selected: (x[1] === this.area) });
      if (x[1] === this.area) { this.areaIndex = tmpAreaIndex; }
      tmpAreaIndex++;
    });
    return options;
  }

  updateFilterData(value: any) {
    this.store.dispatch(new SetFilterData(value));
  }

  async loadData() {
    this.store.dispatch(new LoadData());
  }

  async showBox() {
    const alert = await this.alertController.create({
      header: await this.translateService.get('COVIT_TITLE').toPromise(),
      subHeader: await this.translateService.get('INFO_LICENSE').toPromise(),
      message: `<p>${await this.translateService.get('INFO_PRIVACY').toPromise()}</P>
          <p>${await this.translateService.get('INFO_DATASOURCE').toPromise()}</p>
          <p>${await this.translateService.get('INFO_AUTHOR').toPromise()}</p>
          <p>${await this.translateService.get('INFO_FEEDBACK').toPromise()}</a>`,
      buttons: [await this.translateService.get('INFO_OK').toPromise()]
    });

    await alert.present();
  }
}

