import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
// eslint-disable-next-line import/namespace
import { EMPTY } from 'rxjs';

import { AppComponent } from './app.component';
import { StarWarsUniverseService } from './services/star-wars-universe.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
      providers: [
        {
          provide: StarWarsUniverseService,
          useValue: {
            getStarshipsList: jest.fn(() => EMPTY),
            getPeopleList: jest.fn(() => EMPTY),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
