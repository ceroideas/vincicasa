import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MnumerosPage } from './mnumeros.page';

describe('MnumerosPage', () => {
  let component: MnumerosPage;
  let fixture: ComponentFixture<MnumerosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnumerosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MnumerosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
