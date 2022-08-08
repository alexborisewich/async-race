import AsyncRaceAPI from '../../controller/api';
import { createInfoBlock, createModalWindow } from '../layout/layout';
import {
  Animation,
  QueryStr,
  Data,
  RaceWinner,
  CarProp,
  EngineState,
  WinnersData,
  GarageData,
} from '../../interfaces/interfaces';
import { createCar, createRandomCar } from '../car/car';

export default class Garage {
  pageNum: number;

  constructor(public container: HTMLElement, public api: AsyncRaceAPI) {
    this.pageNum = 1;
  }

  createGarageLayout(): void {
    const settingsContainer = document.createElement('ul') as HTMLElement;
    settingsContainer.classList.add('garage__settings-list', 'settings');
    settingsContainer.innerHTML = `<li class="settings__item">
      <input class="settings__set-name input-name" type="text" id="set-name" name="set-name"
              placeholder="Please enter name a car here...">
      <input class="settings__set-color input-color" type="color" id="set-color" name="set-color" value="#ffffff">
      <input class="settings__btn-set btn" type="submit" value="create" id="btn-set">
      </li>
      <li class="settings__item">
      <input class="settings__upd-name input-name upd" type="text" id="upd-name" name="upd-name"
              placeholder="Please enter new name a car here..." disabled>
      <input class="settings__upd-color input-color upd" type="color" id="upd-color" name="upd-color" value="#ffffff"
              disabled>
      <input class="settings__btn-upd btn upd" type="submit" id="btn-upd" value="update" disabled>
      </li>`;
    this.container.prepend(settingsContainer);
    const controlContainer = document.createElement('div') as HTMLElement;
    controlContainer.classList.add('garage__control');
    controlContainer.innerHTML = `${createInfoBlock('garage').outerHTML}
      <div class="garage__control-container">
      <button class="garage__btn-generate btn" id="btn-generate">generate cars</button>
      <button class="garage__btn-start-race btn" id="btn-start-race">start race</button>
      <button class="garage__btn-stop-race btn" id="btn-stop-race" disabled>stop race</button>
      </div>`;
    this.container.insertBefore(controlContainer, this.container.children[1]);
    const carsContainer = document.createElement('ul') as HTMLElement;
    carsContainer.classList.add('garage__tracks-list', 'car-tracks');
    this.container.insertBefore(carsContainer, this.container.children[2]);
  }

  async renderCars(): Promise<void> {
    const queryStrings: QueryStr[] = [
      { name: '_page', value: this.pageNum },
      { name: '_limit', value: 7 },
    ];
    const garageData = (await this.api.getCars(queryStrings)) as GarageData;
    const carCounter = this.container.querySelector('.count-num') as HTMLElement;
    carCounter.textContent = `${garageData.count}`;
    const carPagePointer = this.container.querySelector('.page-num') as HTMLElement;
    carPagePointer.textContent = `${this.pageNum}`;
    const carsContainer = this.container.querySelector('.car-tracks') as HTMLElement;
    carsContainer.innerHTML = '';
    garageData.items.forEach((car) => carsContainer.append(createCar(car)));
  }

  drawAnimationCar: Animation = async (car, carId, length, stopBtn, stopRaceBtn, carName?) => {
    const carProp = (await this.api.toggleEngineState(carId, EngineState.started)) as CarProp;
    let isDrive = true;
    stopRaceBtn.addEventListener('click', () => (isDrive = false));
    stopBtn.addEventListener('click', () => (isDrive = false));
    const raceWinner = this.api.enableEngineDrive(carId).then((response) => {
      if (isDrive) {
        if (response) {
          return {
            id: carId,
            wins: 1,
            time: Math.round(carProp.distance / carProp.velocity) / 1000,
            name: carName,
          };
        } else {
          isDrive = false;
          stopBtn.innerHTML = 'reset';
          return;
        }
      } else return;
    });
    const start = performance.now();
    requestAnimationFrame(function animate(time: number) {
      let progress = (time - start) / (carProp.distance / carProp.velocity);
      if (progress > 1) {
        stopBtn.innerHTML = 'reset';
        progress = 1;
      }
      car.style.transform = `translateX(${progress * (length - car.getBoundingClientRect().width)}px)`;
      if (progress < 1 && isDrive) requestAnimationFrame(animate);
    });
    stopBtn.disabled = false;
    (stopBtn.previousElementSibling as HTMLButtonElement).disabled = true;
    return raceWinner;
  };

  async prepareCarAnimation(carContainer: HTMLElement, name?: string): Promise<RaceWinner | void> {
    const stopEngineBtn = carContainer.querySelector('.car-track__btn-stop-engine') as HTMLButtonElement;
    const stopRaceBtn = this.container.querySelector('#btn-stop-race') as HTMLButtonElement;
    const track = carContainer.querySelector('.road') as HTMLElement;
    const trackWidth = track.clientWidth - parseInt(getComputedStyle(track, null).paddingLeft) * 2;
    const car = carContainer.querySelector('.car') as HTMLElement;
    return this.drawAnimationCar(car, Number(carContainer.dataset.car), trackWidth, stopEngineBtn, stopRaceBtn, name);
  }

  addAnimationCarHandler(): void {
    const carsContainer = this.container;
    carsContainer.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLButtonElement;
      if (target.id === EngineState.start) {
        target.disabled = true;
        const stopBtn = target.nextElementSibling as HTMLButtonElement;
        stopBtn.disabled = false;
        stopBtn.innerHTML = 'stop';
        const carContainer = target.closest('.car-track') as HTMLElement;
        void this.prepareCarAnimation(carContainer);
      }
    });
  }

  async resetAnimation(carContainer: HTMLElement): Promise<void> {
    const startBtn = carContainer.querySelector('#start-engine') as HTMLButtonElement;
    const stopBtn = carContainer.querySelector('#stop-engine') as HTMLButtonElement;
    const carImg = carContainer.querySelector('.car') as HTMLElement;
    if (startBtn.disabled && stopBtn.innerHTML === 'stop') {
      stopBtn.innerHTML = 'reset';
    } else if (startBtn.disabled && stopBtn.innerHTML === 'reset') {
      stopBtn.innerHTML = 'stop';
      startBtn.disabled = false;
      stopBtn.disabled = true;
    }
    carImg.style.transform = '';
    await this.api.toggleEngineState(Number(carContainer.dataset.car), EngineState.stopped);
  }

  resetAnimationCarHandler(): void {
    const carsContainer = this.container;
    carsContainer.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLButtonElement;
      if (target.id === EngineState.stop) {
        const carContainer = target.closest('.car-tracks__item') as HTMLElement;
        void this.resetAnimation(carContainer);
      }
    });
  }

  async toRaceCars(container: HTMLElement): Promise<void> {
    const resetBtn = this.container.querySelector('#btn-stop-race') as HTMLButtonElement;
    const racePromises: Array<Promise<void | RaceWinner>> = [];
    const cars = container.querySelectorAll('.car-track');
    cars.forEach((car) => {
      const carName = ((car as HTMLElement).querySelector('.road__title-model') as HTMLElement).textContent as string;
      const currentCar: Promise<RaceWinner | void> = this.prepareCarAnimation(car as HTMLElement, carName).then(
        (res) => new Promise((resolve, reject) => (res ? resolve(res) : reject('Error')))
      );
      racePromises.push(currentCar);
    });
    void Promise.allSettled(racePromises).then((results) => {
      if (!results.every((result) => result.status === 'rejected')) resetBtn.innerHTML = 'reset race';
    });
    Promise.any(racePromises)
      .then(async (result) => {
        if (result) {
          createModalWindow(result.name as string, result.time);
          const winners = ((await this.api.getWinners()) as WinnersData).items;
          if (winners.length && winners.some((winner) => winner.id === result.id)) {
            await this.api.getWinner(result.id).then(async (winner) => {
              if (winner) {
                const winnerCar: Data = {
                  wins: winner.wins + 1,
                  time: winner.time < result.time ? winner.time : result.time,
                };
                await this.api.updateWinner(winner.id, winnerCar);
              }
            });
          } else await this.api.createWinner({ id: result.id, wins: 1, time: result.time });
        }
      })
      .catch((error: Error) => console.warn(error));
  }

  async addRaceHandler(): Promise<void> {
    const raceBtn = this.container.querySelector('#btn-start-race') as HTMLButtonElement;
    const resetBtn = this.container.querySelector('#btn-stop-race') as HTMLButtonElement;
    raceBtn.addEventListener('click', () => {
      raceBtn.disabled = true;
      resetBtn.disabled = false;
      resetBtn.innerHTML = 'stop race';
      void this.toRaceCars(this.container);
    });
  }

  resetCarsHandler(): void {
    const raceBtn = this.container.querySelector('#btn-start-race') as HTMLButtonElement;
    const resetBtn = this.container.querySelector('#btn-stop-race') as HTMLButtonElement;
    resetBtn.addEventListener('click', () => {
      const cars = this.container.querySelectorAll('.car-track');
      cars.forEach((car) => void this.resetAnimation(car as HTMLElement));
      if (raceBtn.disabled && resetBtn.innerHTML === 'stop race') resetBtn.innerHTML = 'reset race';
      else if (raceBtn.disabled && resetBtn.innerHTML === 'reset race') {
        resetBtn.innerHTML = 'stop race';
        resetBtn.disabled = true;
        raceBtn.disabled = false;
      }
    });
  }

  addCreateCarHandler(): void {
    const nameInput = this.container.querySelector('#set-name') as HTMLInputElement;
    const colorInput = this.container.querySelector('#set-color') as HTMLInputElement;
    const createBtn = this.container.querySelector('#btn-set') as HTMLInputElement;
    createBtn.addEventListener('click', () => {
      if (nameInput.value && colorInput.value)
        void this.api.createCar({ name: nameInput.value, color: colorInput.value });
      else alert('Name and color required for car!');
      void this.renderCars();
    });
  }

  addUpdateCarHandler() {
    const nameInput = this.container.querySelector('#upd-name') as HTMLInputElement;
    const colorInput = this.container.querySelector('#upd-color') as HTMLInputElement;
    const updateBtn = this.container.querySelector('#btn-upd') as HTMLInputElement;
    updateBtn.addEventListener('click', () => {
      const carId = Number(updateBtn.dataset.car as string);
      if (nameInput.value && colorInput.value && carId)
        void this.api.updateCar(carId, { name: nameInput.value, color: colorInput.value });
      else alert('Name and color required for car!');
      void this.renderCars();
      nameInput.value = '';
      colorInput.value = '#ffffff';
      nameInput.disabled = true;
      colorInput.disabled = true;
      updateBtn.disabled = true;
    });
  }

  addGenerateCarsHandler() {
    const generateBtn = this.container.querySelector('#btn-generate') as HTMLButtonElement;
    generateBtn.addEventListener('click', () => {
      generateBtn.disabled = true;
      for (let i = 0; i < 100; i++) void this.api.createCar(createRandomCar());
      void this.renderCars();
      generateBtn.disabled = false;
    });
  }

  addSelectCarHandler(): void {
    const nameInput = this.container.querySelector('#upd-name') as HTMLInputElement;
    const colorInput = this.container.querySelector('#upd-color') as HTMLInputElement;
    this.container.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLButtonElement;
      if (target.id === 'btn-select-car') {
        const color = target.dataset.color as string;
        const name = (target.closest('.car-track') as HTMLElement).querySelector('.road__title-model') as HTMLElement;
        nameInput.value = (name.textContent as string) || '';
        colorInput.value = color || '#ffffff';
        const updateSubmit = this.container.querySelector('#btn-upd') as HTMLInputElement;
        updateSubmit.dataset.car = String(target.dataset.car);
        const updateElements = this.container.querySelectorAll('.upd');
        updateElements.forEach((element) => {
          (element as HTMLInputElement).disabled = false;
        });
      }
    });
  }

  async addRemoveCarHandler(): Promise<void> {
    this.container.addEventListener('click', (e: Event) => {
      void (async () => {
        const target = e.target as HTMLButtonElement;
        if (target.id === 'btn-remove-car') {
          const winners = ((await this.api.getWinners()) as WinnersData).items;
          target.disabled = true;
          await this.api.deleteCar(Number(target.dataset.car));
          if (winners.length && winners.some((winner) => winner.id === Number(target.dataset.car))) {
            await this.api.deleteWinner(Number(target.dataset.car));
          }
          await this.renderCars().then(() => (target.disabled = false));
        }
      })();
    });
  }

  addPaginationHandler(): void {
    const prevBtn = this.container.querySelector('#prev-garage') as HTMLButtonElement;
    const nextBtn = this.container.querySelector('#next-garage') as HTMLButtonElement;
    const countPointer = this.container.querySelector('.count-num') as HTMLElement;
    const pagination = this.container.querySelector('.garage__pagination') as HTMLElement;
    pagination.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (target === prevBtn) {
        const prevPage = this.pageNum - 1;
        if (prevPage >= 1) this.pageNum = prevPage;
        if (prevPage === 1) prevBtn.disabled = true;
        nextBtn.disabled = false;
      } else if (target === nextBtn) {
        const totalCount = Number(countPointer.textContent);
        const pageCounter = Math.ceil(totalCount / 7);
        const nextPage = this.pageNum + 1;
        if (nextPage <= pageCounter) this.pageNum = nextPage;
        if (nextPage === pageCounter) nextBtn.disabled = true;
        prevBtn.disabled = false;
      }
      void this.renderCars();
    });
  }
}
