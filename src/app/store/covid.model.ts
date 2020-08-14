export interface ICovidData {
  data: string;
  codice_regione: 0;
  denominazione_regione: string;
  ricoverati_con_sintomi: number;
  terapia_intensiva: number;
  isolamento_domiciliare: number;
  variazione_totale_positivi: number;
  nuovi_positivi: number;
  dimessi_guariti: number;
  deceduti: number;
  totale_casi: number;
  tamponi: number;
}

export class CovidDataStateModel {
  filters: {
    area: number,
    data: string,
    prevData: string,
    futData: string
  };
  lastArea: string;
  lastUpdate: string;
  entities: ICovidData[];
  constructor() { }
}
