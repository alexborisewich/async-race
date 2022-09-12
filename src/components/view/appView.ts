import AsyncRaceAPI from '../controller/api';
import { Url } from '../interfaces/interfaces';
import Garage from './garage/garage';
import Winners from './winners/winners';

export default class AppView {
  api: AsyncRaceAPI;

  garageContainer: HTMLElement;

  garage: Garage;

  winners: Winners;

  winnersContainer: HTMLElement;

  constructor() {
    this.api = new AsyncRaceAPI(Url.base, Url.garage, Url.engine, Url.winners);
    this.garageContainer = document.querySelector('.garage') as HTMLElement;
    this.garage = new Garage(this.garageContainer, this.api);
    this.winnersContainer = document.querySelector('.winners') as HTMLElement;
    this.winners = new Winners(this.winnersContainer, this.api);
  }

  renderView(): void {
    try {
      this.garage.createGarageLayout();
      void this.garage.renderCars();
      this.winners.createWinnersTable();
      void this.winners.renderWinners();
    } catch (error) {
      console.error('Error');
    }
  }

  addHandlers(): void {
    this.garage.addCreateCarHandler();
    this.garage.addUpdateCarHandler();
    this.garage.addGenerateCarsHandler();
    this.garage.addSelectCarHandler();
    void this.garage.addRemoveCarHandler();
    this.garage.addAnimationCarHandler();
    this.garage.resetAnimationCarHandler();
    void this.garage.addRaceHandler();
    this.garage.resetCarsHandler();
    this.garage.addPaginationHandler();
    this.winners.addUpdateWinnersHandler();
    this.winners.addSortWinnerHandler();
    this.winners.addPaginationHandler();
  }
}
