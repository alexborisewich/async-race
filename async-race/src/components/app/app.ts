import AppView from '../view/appView';

export default class App {
  appView: AppView;

  constructor() {
    this.appView = new AppView();
  }

  start(): void {
    this.appView.renderView();
    this.appView.addHandlers();
  }
}
