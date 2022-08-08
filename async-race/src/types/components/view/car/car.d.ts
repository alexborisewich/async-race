import { Car, Winner } from '../../interfaces/interfaces';
export declare function createCar(car: Car): HTMLElement;
export declare function createRandomCar(): Car;
export declare function createWinnerCar(car: Car, winner: Winner, number: number): HTMLElement;
export default createCar;
