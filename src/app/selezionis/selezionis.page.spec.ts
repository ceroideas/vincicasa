import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelezionisPage } from './selezionis.page';

describe('SelezionisPage', () => {
  let component: SelezionisPage;
  let fixture: ComponentFixture<SelezionisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelezionisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelezionisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
