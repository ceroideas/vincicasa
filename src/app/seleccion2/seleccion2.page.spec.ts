import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Seleccion2Page } from './seleccion2.page';

describe('Seleccion2Page', () => {
  let component: Seleccion2Page;
  let fixture: ComponentFixture<Seleccion2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Seleccion2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Seleccion2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
