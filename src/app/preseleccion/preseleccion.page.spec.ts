import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreseleccionPage } from './preseleccion.page';

describe('PreseleccionPage', () => {
  let component: PreseleccionPage;
  let fixture: ComponentFixture<PreseleccionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreseleccionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreseleccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
