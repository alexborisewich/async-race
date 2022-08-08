import { Car, Winner } from '../../interfaces/interfaces';

const carBrands = ['Audi', 'Kia', 'Ford', 'Honda', 'Acura', 'BMW', 'Opel', 'Fiat', 'Dodge', 'Mazda', 'Volvo'];
const carModels = ['A6', 'Rio', 'Ka', 'Fit', 'TSX', 'X5', 'Astra', '500', 'RAM', 'CX-5', 'XC-90'];

function getRandomNum(num: number): number {
  return Math.floor(Math.random() * num);
}

function getRandomName(): string {
  return `
  ${carBrands[getRandomNum(carBrands.length)]}
  ${carModels[getRandomNum(carModels.length)]}
  `;
}

function getRandomColor(): string {
  const hexChars = '0123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i += 1) {
    color += hexChars[getRandomNum(hexChars.length)];
  }
  return color;
}

function setCarColor(color: string): string {
  const carImg = `<svg width="83" height="40" viewBox="0 0 83 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_2_2)"><path fill-rule="evenodd" clip-rule="evenodd" d="M82.2853 20.1106C81.7633 34.9996
  79.7161 39.5144 57.8346 37.8653C57.23 37.6067 56.6255 37.3473 56.0218 37.0887C45.924 37.3939 35.7651 37.6991 25.7292
  37.0887C24.6465 38.0798 23.1975 37.6067 21.9317 37.8653C18.6717 38.2892 14.0696 38.469 9.58965 38.0383C-0.474297
  37.3176 0.446463 26.8323 0.269264 20.8635C0.417636 14.2121 -1.752 5.24108 9.50401 2.73994C14.6928 2.49542 18.8439
  2.43438 24.5211 2.73952C24.9526 2.96962 25.3833 3.19981 25.8148 3.42992C35.7897 3.15208 45.5815 2.81319 56.105
  3.32868C56.9392 3.02354 57.7735 2.7184 58.607 2.41326C80.1705 1.29445 81.5325 5.54596 82.2853 20.1104V20.1106Z"
  fill="${color}" stroke="black" stroke-width="0.75"/><path fill-rule="evenodd" clip-rule="evenodd" d="M62.5809
  5.76013C70.32 12.5784 70.9817 27.8542 62.4945 34.4995C58.4672 34.0391 54.44 33.5788 50.4118 33.1193C51.8218 26.8477
  53.3174 16.9508 49.9803 7.31422C54.1805 6.79593 58.3807 6.27816 62.5809 5.7603V5.76013Z" fill="black"
  fill-opacity="0.83065" stroke="black" stroke-width="1.33333"/><path fill-rule="evenodd" clip-rule="evenodd"
  d="M22.5356 8.43561C21.6436 16.8363 21.0976 24.632 22.9671 32.0829H10.6259C5.70665 24.6896 5.96525 15.7424 10.3672
  8.60774C14.4234 8.55049 18.4794 8.49298 22.5356 8.43541V8.43561Z" fill="black" fill-opacity="0.83065" stroke="black"
  stroke-width="1.33333"/><path d="M78.2905 32.8398C78.2761 32.8703 78.2564 32.9077 78.2321 32.9518C78.1764 33.051
  78.0997 33.1751 78.0046 33.3163C77.8144 33.5986 77.5587 33.9385 77.2741 34.2695C76.9882 34.6014 76.68 34.9169 76.3849
  35.1553C76.0951 35.3893 75.8544 35.5184 75.6826 35.5511C75.2676 35.525 75.0118 35.4497 74.8649 35.3595C74.7344 35.2799
  74.6859 35.1889 74.678 35.0623C74.6689 34.9094 74.7213 34.686 74.8702 34.3765C75.0151 34.0754 75.2367 33.7235 75.5259
  33.3216C75.9476 32.827 76.3233 32.4458 76.6538 32.1814C76.9921 31.9108 77.2544 31.7866 77.4479 31.7605C77.6125 31.7383
  77.7489 31.7831 77.8859 31.9392C78.0295 32.1026 78.1705 32.3879 78.2905 32.8398Z" fill="white" stroke="black"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M78.718 7.5459C78.3725 9.69482 77.2262 9.44131 75.3423 7.55921C74.019
  6.0067 73.7371 5.0193 75.5495 4.77164C76.6223 4.82922 78.5672 7.11069 78.718 7.5459Z" fill="white" stroke="black"
  stroke-width="1.33333"/><path fill-rule="evenodd" clip-rule="evenodd" d="M59.5601 4.72451C47.0747 3.94779 35.539
  4.12042 23.4851 4.55188C21.3561 4.89712 19.1407 5.15606 17.0127 5.50122C22.2625 6.55127 33.3379 7.21291 43.7664
  6.7095C49.3766 6.2636 54.2526 5.55878 59.5601 4.72451Z" fill="black" fill-opacity="0.83065" stroke="black"
  stroke-width="1.33333"/><path fill-rule="evenodd" clip-rule="evenodd" d="M60.5359 35.8712C48.0506 36.6478 36.5148
  36.4757 24.461 36.0442C22.3321 35.6982 20.1166 35.4397 17.9877 35.0946C23.2384 34.0441 34.3138 33.3828 44.7423
  33.8864C50.3516 34.3324 55.2285 35.0369 60.5359 35.8712Z" fill="black" fill-opacity="0.83065" stroke="black"
  stroke-width="1.33333"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.59851 30.5467C5.45313 31.0147 6.97923
  34.7165 6.42985 35.4287C4.90373 35.9373 3.31741 33.2726 2.95114 32.1941C2.95114 31.2784 3.68368 30.4857 4.59851
  30.5467Z"fill="#FFB800" stroke="black" stroke-width="1.33333"/><path fill-rule="evenodd" clip-rule="evenodd"
  d="M4.44082 10.5003C5.29545 10.0323 6.82074 6.33031 6.27132 5.61838C4.74604 5.10975 3.15888 7.77462 2.79346
  8.85272C2.79346 9.76773 3.52515 10.5613 4.44082 10.5003Z" fill="#FFB800" stroke="black" stroke-width="1.33333"/>
  </g><defs><clipPath id="clip0_2_2"><rect width="82.623" height="40" fill="white"/></clipPath></defs></svg>`;
  return carImg;
}

export function createCar(car: Car): HTMLElement {
  const newCar = document.createElement('li') as HTMLElement;
  newCar.classList.add('car-tracks__item', 'car-track');
  newCar.dataset.car = `${car.id as number}`;
  newCar.innerHTML = `<div class="car-track__ctrl">
    <button class="car-track__btn-select btn" id="btn-select-car" data-color="${car.color as string}"
            data-car="${car.id as number}">Select</button>
    <button class="car-track__btn-remove btn" id="btn-remove-car" data-car="${car.id as number}">remove</button>
    <button class="car-track__btn-start-engine btn" id="start-engine" data-car="${car.id as number}">start</button>
    <button class="car-track__btn-stop-engine btn" id="stop-engine"
            data-car="${car.id as number}" disabled>stop</button>
    </div>
    <div class="car-track__road road">
    <p class="road__title-model">${car.name as string}</p>
    ${setCarColor(car.color as string)}
    </div>`;
  const carImg = newCar.querySelector('svg') as SVGElement;
  carImg.classList.add('car-track__car-img', 'car');
  return newCar;
}

export function createRandomCar(): Car {
  return {
    name: `${getRandomName()}`,
    color: `#${getRandomColor()}`,
  };
}

export function createWinnerCar(car: Car, winner: Winner, number: number): HTMLElement {
  const winnerCar = document.createElement('tr');
  winnerCar.classList.add('table__row');
  winnerCar.innerHTML = `<td class="table__cell" scope="row">${number}</td>
    <td class="table__cell">${setCarColor(car.color as string)}</td>
    <td class="table__cell">${car.name as string}</td>
    <td class="table__cell">${winner.wins}</td>
    <td class="table__cell">${winner.time}</td>`;
  return winnerCar;
}

export default createCar;
