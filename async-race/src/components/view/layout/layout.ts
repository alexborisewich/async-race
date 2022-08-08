function createHeader(container: HTMLElement): void {
  const header = document.createElement('header');
  header.classList.add('header');
  header.innerHTML = `<h1 class="header__logo logo">
      <a class="header__text" href="#">Async Race</a>
    </h1>
    <nav class="header__nav">
      <button class="header__btn-garage btn" id="garage">GARAGE</button>
      <button class="header__btn-winners btn" id="winners">WINNERS</button>
    </nav>`;
  container.prepend(header);
}

function createPagination(view: string): HTMLElement {
  const pagination = document.createElement('div') as HTMLElement;
  pagination.classList.add(`${view}__pagination`);
  pagination.innerHTML = `
  <button class="${view}__pag-btn btn" id="prev-${view}" disabled>Prev</button>
    <h3 class="${view}__pag-pointer page-pointer"><span class="${view}__page-num page-num"></span></h3>
  <button class="${view}__pag-btn btn" id="next-${view}">Next</button>`;
  return pagination;
}

function createMainLayout(container: HTMLElement): void {
  const main = document.createElement('main');
  main.classList.add('main');
  main.innerHTML = `
  <section class="garage"></section>
  <section class="winners hide"></section>`;

  const garage = main.querySelector('.garage') as HTMLElement;
  garage.append(createPagination('garage'));
  const winners = main.querySelector('.winners') as HTMLElement;
  winners.append(createPagination('winners'));
  container.append(main);
}

export function createInfoBlock(view: string): HTMLElement {
  const infoBlock = document.createElement('div') as HTMLElement;
  infoBlock.classList.add(`${view}__info`, 'info');
  infoBlock.innerHTML = `<h2 class="${view}__count-pointer count-pointer">${view} total cars:
    <span class="${view}__count-num count-num"></span>
    </h2>`;
  return infoBlock;
}

function createFooter(container: HTMLElement): void {
  const footer = document.createElement('footer');
  footer.classList.add('footer');
  footer.innerHTML = `<p class="footer__year">2022</p><p class="footer__github-link-wrapper">
  <a class="footer__github-link" href="https://github.com/alexborisewich">github</a></p>
  <p class="footer__rsschool-link-wrapper"><a class="footer__rsschool-link" href="https://rs.school/js/">
  <img class="footer__rsschool-img" src="https://rs.school/images/rs_school_js.svg" alt="RSSchool"></a></p>`;
  container.append(footer);
}

export function createModalWindow(name: string, time: number): void {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('page__shadow');
  const modalWindow = document.createElement('div');
  modalWindow.classList.add('page__modal');
  modalWindow.innerHTML = `${name} went first <span>${time}</span>!`;
  modalContainer.append(modalWindow);
  document.body.append(modalContainer);
  document.body.classList.add('no-scroll');
  setTimeout(() => {
    modalContainer.remove();
    document.body.classList.remove('no-scroll');
  }, 3000);
}

function addNavigationHandler(container: HTMLElement): void {
  const navigation = container.querySelector('.header__nav') as HTMLElement;
  navigation.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON') {
      const garage = container.querySelector('.garage') as HTMLElement;
      const winners = container.querySelector('.winners') as HTMLElement;
      if (target.id === 'garage') {
        garage.classList.remove('hide');
        winners.classList.add('hide');
      } else {
        winners.classList.remove('hide');
        garage.classList.add('hide');
      }
    }
  });
}

export function renderBasicLayout() {
  const page = document.querySelector('.page') as HTMLBodyElement;
  createHeader(page);
  createMainLayout(page);
  createFooter(page);
  addNavigationHandler(page);
}

export default renderBasicLayout;
