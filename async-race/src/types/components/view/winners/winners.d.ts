import AsyncRaceAPI from '../../controller/api';
export default class Winners {
    container: HTMLElement;
    api: AsyncRaceAPI;
    pageNumber: number;
    sort: string;
    order: string;
    constructor(container: HTMLElement, api: AsyncRaceAPI);
    createWinnersTable(): void;
    renderWinners(): Promise<void>;
    addUpdateWinnersHandler(): void;
    addPaginationHandler(): void;
    addSortWinnerHandler(): void;
}
