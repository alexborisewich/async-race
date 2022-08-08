import AsyncRaceAPI from '../../controller/api';
import { createInfoBlock } from '../layout/layout';
import { WinnersData, Car, QueryStr, Sort } from '../../interfaces/interfaces';
import { createWinnerCar } from '../car/car';

export default class Winners {
  pageNumber: number;

  sort: string;

  order: string;

  constructor(public container: HTMLElement, public api: AsyncRaceAPI) {
    this.pageNumber = 1;
    this.sort = 'wins';
    this.order = 'DESC';
  }

  createWinnersTable(): void {
    const winnersTable = document.createElement('table');
    winnersTable.classList.add('winners__table', 'table');
    winnersTable.innerHTML = `<thead class="table__header">
      <tr class="table__header-row">
        <th class="table__header-cell" scope="col">№</th>
        <th class="table__header-cell" scope="col">Car</th>
        <th class="table__header-cell" scope="col">Name</th>
        <th class="table__header-cell" data-sort="wins" scope="col">Wins</th>
        <th class="table__header-cell" data-sort="time" scope="col">Best time (seconds)</th>
      </tr>
      </thead>
      <tbody class="table__body"></tbody>`;
    this.container.prepend(winnersTable);
    const infoBlock = createInfoBlock('winners');
    this.container.prepend(infoBlock);
  }

  async renderWinners(): Promise<void> {
    const queryStrings: QueryStr[] = [
      { name: '_page', value: this.pageNumber },
      { name: '_limit', value: 10 },
      { name: '_sort', value: this.sort },
      { name: '_order', value: this.order },
    ];
    const winnersData = (await this.api.getWinners(queryStrings)) as WinnersData;
    const winnersCounter = this.container.querySelector('.count-num') as HTMLElement;
    winnersCounter.textContent = `${winnersData.count}`;
    const winnersPagePointer = this.container.querySelector('.page-num') as HTMLElement;
    winnersPagePointer.textContent = `${this.pageNumber}`;
    const winnersTableBody = this.container.querySelector('.table__body') as HTMLElement;
    winnersTableBody.innerHTML = '';
    for (const [index, winner] of winnersData.items.entries()) {
      const car = (await this.api.getCar(winner.id)) as Car;
      winnersTableBody.append(createWinnerCar(car, winner, Number(index + 1)));
    }
  }

  addUpdateWinnersHandler(): void {
    const winnersBtn = document.querySelector('#winners') as HTMLButtonElement;
    winnersBtn.addEventListener('click', () => {
      void this.renderWinners();
    });
  }

  addPaginationHandler(): void {
    const prevBtn = this.container.querySelector('#prev-winners') as HTMLButtonElement;
    const nextBtn = this.container.querySelector('#next-winners') as HTMLButtonElement;
    const countPointer = this.container.querySelector('.count-num') as HTMLElement;
    const pagination = this.container.querySelector('.winners__pagination') as HTMLElement;
    pagination.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (target === prevBtn) {
        const prevPage = this.pageNumber - 1;
        if (prevPage >= 1) this.pageNumber = prevPage;
        if (prevPage === 1) prevBtn.disabled = true;
        nextBtn.disabled = false;
      } else if (target === nextBtn) {
        const totalCount = Number(countPointer.textContent);
        const pageCounter = Math.ceil(totalCount / 10);
        const nextPage = this.pageNumber + 1;
        if (nextPage <= pageCounter) this.pageNumber = nextPage;
        if (nextPage === pageCounter) nextBtn.disabled = true;
        prevBtn.disabled = false;
      }
      void this.renderWinners();
    });
  }

  addSortWinnerHandler() {
    const sortElementsContainer = this.container.querySelector('.table__header') as HTMLElement;
    sortElementsContainer.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.dataset.sort === Sort.byWins) {
        this.sort = Sort.byWins;
      } else if (target.dataset.sort === Sort.byTime) {
        this.sort = Sort.byTime;
      }
      this.order = this.order === Sort.orderUp ? Sort.orderDown : Sort.orderUp;
      void this.renderWinners();
    });
  }
}
