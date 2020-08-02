import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArchivoPage } from './archivo.page';

describe('ArchivoPage', () => {
  let component: ArchivoPage;
  let fixture: ComponentFixture<ArchivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArchivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
