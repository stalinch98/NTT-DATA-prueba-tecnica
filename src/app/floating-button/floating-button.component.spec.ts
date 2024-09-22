import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FloatingButtonComponent } from './floating-button.component';
import { ProductInterface } from '../interfaces/interfaces';

describe('FloatingButtonComponent', () => {
  let component: FloatingButtonComponent;
  let fixture: ComponentFixture<FloatingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FloatingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu visibility', () => {
    const event = new MouseEvent('click');
    component.toggleMenu(event);
    expect(component.menuVisible).toBe(true);
    component.toggleMenu(event);
    expect(component.menuVisible).toBe(false);
  });

  it('should show edit modal', () => {
    component.edit();
    expect(component.menuVisible).toBe(false);
    expect(component.showModalEdit).toBe(true);
  });

  it('should show delete modal', () => {
    component.delete();
    expect(component.menuVisible).toBe(false);
    expect(component.showModalDelete).toBe(true);
  });

  it('should close delete modal', () => {
    component.closeModal();
    expect(component.showModalDelete).toBe(false);
  });

  it('should close edit modal', () => {
    component.closeModalEdit();
    expect(component.showModalEdit).toBe(false);
  });

  it('should emit product updated event', () => {
    jest.spyOn(component.productUpdated, 'emit');
    const product: ProductInterface = {
      id: '1', name: 'Test Product', description: 'Description',
      logo: 'logo-url',
      date_release: new Date(),
      date_revision: new Date()
    };
    component.onProductUpdated(product);
    expect(component.productUpdated.emit).toHaveBeenCalledWith(product);
  });

  it('should emit product deleted event', () => {
    jest.spyOn(component.productDeleted, 'emit');
    const productId = '1';
    component.onProductDeleted(productId);
    expect(component.productDeleted.emit).toHaveBeenCalledWith(productId);
  });

  it('should hide menu when clicking outside', () => {
    component.menuVisible = true;
    const event = new MouseEvent('click');
    document.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.menuVisible).toBe(false);
  });
});
