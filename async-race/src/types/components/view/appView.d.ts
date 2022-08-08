import AsyncRaceAPI from '../controller/api';
import Garage from './garage/garage';
import Winners from './winners/winners';
export default class AppView {
    api: AsyncRaceAPI;
    garageContainer: HTMLElement;
    garage: Garage;
    winners: Winners;
    winnersContainer: HTMLElement;
    constructor();
    renderView(): void;
    addHandlers(): void;
}
