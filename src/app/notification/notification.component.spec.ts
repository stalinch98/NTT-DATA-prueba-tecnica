import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { NotificationService } from '../notification.service';
import { of } from 'rxjs';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let notificationService: NotificationService;

  beforeEach(async () => {
    const notificationServiceMock = {
      getNotification: jest.fn().mockReturnValue(of({ message: 'Test message', type: 'success' }))
    };

    await TestBed.configureTestingModule({
      imports: [NotificationComponent],
      providers: [{ provide: NotificationService, useValue: notificationServiceMock }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display notification message', () => {
    expect(component.message).toBe('Test message');
    expect(component.type).toBe('success');
    expect(component.show).toBe(true);
  });

  it('should hide notification after 6 seconds', (done) => {
    jest.useFakeTimers();
    component.ngOnInit();
    jest.advanceTimersByTime(6000);
    expect(component.show).toBe(false);
    jest.useRealTimers();
    done();
  });
});
