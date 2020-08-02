import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerificaPage } from './verifica.page';

describe('VerificaPage', () => {
  let component: VerificaPage;
  let fixture: ComponentFixture<VerificaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerificaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
