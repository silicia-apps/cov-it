import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store';
import { CovidDataStateModel, ICovidData } from './covid.model';
import { LoadData, SetFilterData, SetFilterArea } from './covid.actions';
import { CovidDataService } from '../services/covid-data.service';

@State<CovidDataStateModel>({
  name: 'covid',
  defaults: {
    filters: {
      area: 0,
      data: '2020-02-24',
      prevData: '2020-02-24',
      futData: '2020-02-25'
    },
    lastArea: 'HOME_ALL',
    lastUpdate: '',
    entities: []
  }
})
@Injectable()
export class CovidDataState {

  constructor(
    private covidDataService: CovidDataService,
  ) { }

  @Selector([CovidDataState])
  static getLastUpdate(state: CovidDataStateModel) {
    return state.lastUpdate;
  }

  @Selector([CovidDataState])
  static getData(state: CovidDataStateModel) {
    return state.filters.data;
  }

  @Selector([CovidDataState])
  static getPrevDay(state: CovidDataStateModel) {
    return state.filters.prevData;
  }

  @Selector([CovidDataState])
  static getArea(state: CovidDataStateModel) {
    return state.filters.area;
  }
  @Selector([CovidDataState])
  static getLastArea(state: CovidDataStateModel) {
    return state.lastArea;
  }

  @Selector([CovidDataState])
  static getHistory(state: CovidDataStateModel) {
    // tslint:disable-next-line: max-line-length
    const filteredData = state.entities.filter((covidData: ICovidData) => covidData.data.substr(0, 10) < state.filters.futData && (state.filters.area === 0 || covidData.codice_regione === state.filters.area));
    let history1 = [];
    let history2 = [];
    let history3 = [];
    let history4 = [];
    let history5 = [];
    let history6 = [];
    let history7 = [];

    filteredData.map((entity: ICovidData) => {
      const truncData = entity.data.substr(8, 2) + '/' + entity.data.substr(5, 2) + '/' + entity.data.substr(2, 2);
      history1.push({name: truncData, value: entity.deceduti});
      history2.push({name: truncData, value: entity.dimessi_guariti});
      history3.push({name: truncData, value: entity.terapia_intensiva });
      history4.push({name: truncData, value: entity.ricoverati_con_sintomi });
      history5.push({name: truncData, value: entity.isolamento_domiciliare });
      history6.push({name: truncData, value: entity.isolamento_domiciliare + entity.ricoverati_con_sintomi + entity.terapia_intensiva });
      history7.push({name: truncData, value: entity.totale_casi});
    });
    let lastData = '';
    let tmp = [];
    history1.map ((data) => {
      if (data.name === lastData) {
        tmp[tmp.length - 1].value += data.value;
      } else {
        tmp.push(data);
        lastData  = data.name;
      }
    });
    history1 = tmp;
    tmp = [];
    history2.map ((data) => {
      if (data.name === lastData) {
        tmp[tmp.length - 1].value += data.value;
      } else {
        tmp.push(data);
        lastData  = data.name;
      }
    });
    history2 = tmp;
    tmp = [];
    history3.map ((data) => {
      if (data.name === lastData) {
        tmp[tmp.length - 1].value += data.value;
      } else {
        tmp.push(data);
        lastData  = data.name;
      }
    });
    history3 = tmp;
    tmp = [];
    history4.map ((data) => {
      if (data.name === lastData) {
        tmp[tmp.length - 1].value += data.value;
      } else {
        tmp.push(data);
        lastData  = data.name;
      }
    });
    history4 = tmp;
    tmp = [];
    history5.map ((data) => {
      if (data.name === lastData) {
        tmp[tmp.length - 1].value += data.value;
      } else {
        tmp.push(data);
        lastData  = data.name;
      }
    });
    history5 = tmp;
    tmp = [];
    history6.map ((data) => {
      if (data.name === lastData) {
        tmp[tmp.length - 1].value += data.value;
      } else {
        tmp.push(data);
        lastData  = data.name;
      }
    });
    history6 = tmp;
    tmp = [];
    history7.map ((data) => {
      if (data.name === lastData) {
        tmp[tmp.length - 1].value += data.value;
      } else {
        tmp.push(data);
        lastData  = data.name;
      }
    });
    history7 = tmp;
    // tslint:disable-next-line: max-line-length
    return { deceduti: history1, guariti: history2, terapia: history3, ricoverati: history4, domicilio: history5, positivi: history6, totale: history7 };
  }

  static getCovidData(previous: boolean) {
    return createSelector([CovidDataState], (state: CovidDataStateModel): ICovidData => {
      let filteredData: ICovidData[];
      if (previous) {
        // tslint:disable-next-line: max-line-length
        filteredData = state.entities.filter((covidData: ICovidData) => covidData.data.substr(0, 10) === state.filters.prevData && (state.filters.area === 0 || covidData.codice_regione === state.filters.area));
      } else {
        // tslint:disable-next-line: max-line-length
        filteredData = state.entities.filter((covidData: ICovidData) => covidData.data.substr(0, 10) === state.filters.data && (state.filters.area === 0 || covidData.codice_regione === state.filters.area));
      }
      if (filteredData.length > 1) {
        const totalData: ICovidData = {
          data: state.filters.data,
          codice_regione: 0,
          denominazione_regione: 'HOME_ALL',
          totale_casi: 0,
          deceduti: 0,
          dimessi_guariti: 0,
          nuovi_positivi: 0,
          ricoverati_con_sintomi: 0,
          terapia_intensiva: 0,
          isolamento_domiciliare: 0,
          variazione_totale_positivi: 0,
          tamponi: 0,
        };
        filteredData.map((entity: ICovidData) => {
          totalData.totale_casi += entity.totale_casi;
          totalData.terapia_intensiva += entity.terapia_intensiva;
          totalData.isolamento_domiciliare += entity.isolamento_domiciliare;
          totalData.ricoverati_con_sintomi += entity.ricoverati_con_sintomi;
          totalData.variazione_totale_positivi += entity.variazione_totale_positivi;
          totalData.deceduti += entity.deceduti;
          totalData.dimessi_guariti += entity.dimessi_guariti;
          totalData.nuovi_positivi += entity.nuovi_positivi;
          totalData.tamponi += entity.tamponi;
        });
        return totalData;
      } else {
        return filteredData[0];
      }
    });
  }

  @Action(LoadData)
  async LoadData(ctx: StateContext<CovidDataStateModel>) {
      const state = ctx.getState();
      // tslint:disable-next-line: max-line-length
      const data: any = await this.covidDataService.LoadData('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json');
      ctx.patchState({ lastUpdate: new Date().toISOString().substr(0, 10), entities: data });
  }

  @Action(SetFilterData)
  setFilterData(ctx: StateContext<CovidDataStateModel>, { payload }: SetFilterData) {
    const state = ctx.getState();
    const newData = {
      data: payload.substr(0, 10),
      area: state.filters.area,
      prevData: new Date(new Date(payload).valueOf() - 86400000).toISOString().substr(0, 10),
      futData: new Date(new Date(payload).valueOf() + 86400000).toISOString().substr(0, 10),
    };
    ctx.patchState({filters: newData});
  }

  @Action(SetFilterArea)
  setFilterArea(ctx: StateContext<CovidDataStateModel>, { payload }: SetFilterArea) {
    const state = ctx.getState();
    const newData = {
      data: state.filters.data,
      area: payload.area,
      prevData: state.filters.prevData,
      futData: state.filters.futData,
    };
    ctx.patchState({ lastArea: payload.denominazione, filters: newData });
  }
}
