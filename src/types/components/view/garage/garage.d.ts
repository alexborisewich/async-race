import AsyncRaceAPI from '../../controller/api';
import { Animation, RaceWinner } from '../../interfaces/interfaces';
export default class Garage {
    container: HTMLElement;
    api: AsyncRaceAPI;
    pageNum: number;
    constructor(container: HTMLElement, api: AsyncRaceAPI);
    createGarageLayout(): void;
    renderCars(): Promise<void>;
    drawAnimationCar: Animation;
    prepareCarAnimation(carContainer: HTMLElement, name?: string): Promise<RaceWinner | void>;
    addAnimationCarHandler(): void;
    resetAnimation(carContainer: HTMLElement): Promise<void>;
    resetAnimationCarHandler(): void;
    toRaceCars(container: HTMLElement): Promise<void>;
    addRaceHandler(): Promise<void>;
    resetCarsHandler(): void;
    addCreateCarHandler(): void;
    addUpdateCarHandler(): void;
    addGenerateCarsHandler(): void;
    addSelectCarHandler(): void;
    addRemoveCarHandler(): Promise<void>;
    addPaginationHandler(): void;
}
