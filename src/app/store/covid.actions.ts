import { ICovidData } from './covid.model';

export class LoadData {
  static type = '[CovidData] Load data from github';
  constructor() {}
}

export class SetFilterData {
  static type = `[CovidData] Set Filter Data`;
  constructor(public payload: string) {}
}

export class SetFilterArea {
  static type = `[CovidData] Set Filter Area`;
  constructor(public payload: any) {}
}
