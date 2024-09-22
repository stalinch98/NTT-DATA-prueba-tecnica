import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current year in the footer', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const currentYear = new Date().getFullYear();
    expect(compiled.querySelector('.footer-title')?.textContent).toContain(`${currentYear}`);
  });

  it('should display the correct footer text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.footer-title')?.textContent).toContain('Stalin Chiguano. Todos los derechos reservados.');
  });
});
