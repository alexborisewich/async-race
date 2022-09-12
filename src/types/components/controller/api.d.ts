import { QueryStr, Car, GarageData, CarProp, Winner, WinnersData, CarStatus, Data } from '../interfaces/interfaces';
export default class AsyncRaceAPI {
    baseUrl: string;
    carsPath: string;
    enginePath: string;
    winnersPath: string;
    constructor(baseUrl: string, carsPath: string, enginePath: string, winnersPath: string);
    errorHandler(response: Response): void;
    getQueryString(queryStrings: QueryStr[]): string;
    getCars(queryStrings?: QueryStr[]): Promise<GarageData | void>;
    getCar(id: number): Promise<Car | void>;
    createCar(newСar: Car): Promise<Car | void>;
    deleteCar(id: number): Promise<void>;
    updateCar(id: number, body: Car): Promise<Car | void>;
    toggleEngineState(id: number, status: string): Promise<CarProp | void>;
    enableEngineDrive(id: number): Promise<CarStatus | void>;
    getWinners(queryStrings?: QueryStr[]): Promise<WinnersData | void>;
    getWinner(id: number): Promise<Winner | void>;
    createWinner(newWinner: Winner): Promise<Winner | void>;
    deleteWinner(id: number): Promise<void>;
    updateWinner(id: number, body: Data): Promise<Winner | void>;
}
