import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalSeleccionPage } from './modal-seleccion.page';

describe('ModalSeleccionPage', () => {
  let component: ModalSeleccionPage;
  let fixture: ComponentFixture<ModalSeleccionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSeleccionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalSeleccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
