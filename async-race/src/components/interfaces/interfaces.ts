export enum Url {
  base = 'http://127.0.0.1:3000',
  garage = 'garage',
  winners = 'winners',
  engine = 'engine',
}

export enum EngineState {
  start = 'start-engine',
  stop = 'stop-engine',
  started = 'started',
  stopped = 'stopped',
}

export enum Sort {
  byWins = 'wins',
  byTime = 'time',
  orderUp = 'ASC',
  orderDown = 'DESC',
}
export type Animation = {
  (
    a: HTMLElement,
    b: number,
    c: number,
    d: HTMLButtonElement,
    e: HTMLButtonElement,
    f?: string
  ): Promise<RaceWinner | void>;
};

export interface QueryStr {
  name: string;
  value: string | number;
}

export interface Data {
  [key: string]: string | number;
}

export interface Car {
  name?: string;
  color?: string;
  id?: number;
}

export interface GarageData {
  items: Car[];
  count: number;
}

export interface CarProp {
  velocity: number;
  distance: number;
}

export interface CarStatus {
  status: boolean;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface RaceWinner {
  id: number;
  wins: number;
  time: number;
  name?: string;
}

export interface WinnersData {
  items: Winner[];
  count: number;
}

export default QueryStr;
