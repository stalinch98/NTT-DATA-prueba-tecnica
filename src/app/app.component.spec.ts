import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app: AppComponent;

  beforeEach(() => {
    app = new AppComponent();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'ntt-data-prueba-tecnica' title`, () => {
    expect(app.title).toEqual('ntt-data-prueba-tecnica');
  });

  it('should render title', () => {
    const compiled = document.createElement('div');
    compiled.innerHTML = `<h1>Hello, ntt-data-prueba-tecnica</h1>`;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, ntt-data-prueba-tecnica');
  });
});
