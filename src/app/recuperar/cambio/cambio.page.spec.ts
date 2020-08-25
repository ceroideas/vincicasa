import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CambioPage } from './cambio.page';

describe('CambioPage', () => {
  let component: CambioPage;
  let fixture: ComponentFixture<CambioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CambioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
