import { QueryStr, Car, GarageData, CarProp, Winner, WinnersData, CarStatus, Data } from '../interfaces/interfaces';

export default class AsyncRaceAPI {
  constructor(public baseUrl: string, public carsPath: string, public enginePath: string, public winnersPath: string) {}

  errorHandler(response: Response): void {
    console.warn(`${response.status}: ${response.statusText}`);
  }

  getQueryString(queryStrings: QueryStr[]): string {
    return queryStrings.length
      ? `?${queryStrings.map((queryStr) => `${queryStr.name}=${queryStr.value}`).join('&')}`
      : '';
  }

  async getCars(queryStrings: QueryStr[] = []): Promise<GarageData | void> {
    const response = await fetch(`${this.baseUrl}/${this.carsPath}${this.getQueryString(queryStrings)}`);
    return response.ok
      ? {
          items: (await response.json()) as Car[],
          count: Number(response.headers.get('X-Total-Count')),
        }
      : this.errorHandler(response);
  }

  async getCar(id: number): Promise<Car | void> {
    const response = await fetch(`${this.baseUrl}/${this.carsPath}/${id}`);
    return response.ok ? response.json() : this.errorHandler(response);
  }

  async createCar(newСar: Car): Promise<Car | void> {
    const response = await fetch(`${this.baseUrl}/${this.carsPath}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newСar),
    });
    return response.ok ? response.json() : this.errorHandler(response);
  }

  async deleteCar(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${this.carsPath}/${id}`, { method: 'DELETE' });
    return response.ok ? response.json() : this.errorHandler(response);
  }

  async updateCar(id: number, body: Car): Promise<Car | void> {
    const response = await fetch(`${this.baseUrl}/${this.carsPath}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return response.ok ? response.json() : this.errorHandler(response);
  }

  async toggleEngineState(id: number, status: string): Promise<CarProp | void> {
    const response = await fetch(`${this.baseUrl}/${this.enginePath}?id=${id}&status=${status}`, { method: 'PATCH' });
    return response.ok ? response.json() : this.errorHandler(response);
  }

  async enableEngineDrive(id: number): Promise<CarStatus | void> {
    const response = await fetch(`${this.baseUrl}/${this.enginePath}?id=${id}&status=drive`, { method: 'PATCH' });
    return response.ok ? response.json() : this.errorHandler(response);
  }

  async getWinners(queryStrings: QueryStr[] = []): Promise<WinnersData | void> {
    const response = await fetch(`${this.baseUrl}/${this.winnersPath}${this.getQueryString(queryStrings)}`);
    return response.ok
      ? {
          items: (await response.json()) as Winner[],
          count: Number(response.headers.get('X-Total-Count')),
        }
      : this.errorHandler(response);
  }

  async getWinner(id: number): Promise<Winner | void> {
    const response = await fetch(`${this.baseUrl}/${this.winnersPath}/${id}`);
    return response.ok ? response.json() : this.errorHandler(response);
  }

  async createWinner(newWinner: Winner): Promise<Winner | void> {
    const response = await fetch(`${this.baseUrl}/${this.winnersPath}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newWinner),
    });
    return response.ok ? response.json() : this.errorHandler(response);
  }

  async deleteWinner(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${this.winnersPath}/${id}`, { method: 'DELETE' });
    if (!response.ok) this.errorHandler(response);
  }

  async updateWinner(id: number, body: Data): Promise<Winner | void> {
    const response = await fetch(`${this.baseUrl}/${this.winnersPath}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return response.ok ? response.json() : this.errorHandler(response);
  }
}
